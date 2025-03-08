import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import {
    createValidation,
    updateValidation,
    getValidation,
    deleteValidation,
    deleteSelectionValidation,
    paginationValidation,
    searchValidation,
    createDayRentDiscountValidation,
    createDiscountValidation,
    createFreeShippingValidation,
    updateDayRentDiscountValidation,
    updateDiscountValidation,
    updateFreeShippingValidation,
} from "../validation/promo-validation.js";
import dotenv from 'dotenv';
dotenv.config();

const create = async (request) => {
    const dataPromo = validate(createValidation, request.body);
    const promo = await prismaClient.promo.findFirst({
        where: {
            title: dataPromo.title
        }
    });
    if (request.file) {
        dataPromo.image = `${process.env.API_URL}image/${request.file.filename}`;
    }
    if (!dataPromo.image) {
        throw new ResponseError(400, "image is required")
    }
    if (promo) {
        throw new ResponseError(401, `${dataPromo.title} title already exists`);
    }
    const {discount, dayRentDiscount, freeShipping, ...createData} = dataPromo;
    const relatedData = {
        Discount: discount ? { Discount: { create: discount } } : undefined,
        DayRentDiscount: dayRentDiscount ? { DayRentDiscount: { create: dayRentDiscount } } : undefined,
        FreeShipping: freeShipping ? { FreeShipping: { create: freeShipping } } : undefined,
    }[createData.type];
    
    if (!relatedData) {
        throw new ResponseError(400, "Data terkait promosi tidak valid atau hilang.");
    }
    const createPromo =  await prismaClient.promo.create({
        data:{
            ...createData,
            ...relatedData
        }
    });

    return await prismaClient.promo.findUnique({
        where: { id: createPromo.id },
        include: {
            Discount: true,
            FreeShipping: true,
            DayRentDiscount: true
        }
    });

}
const update = async (request) => {
    const dataPromo = validate(updateValidation, request.body);

    const promo = await prismaClient.promo.findUnique({
        where: { id: dataPromo.id },
        include: {
            Discount: true,
            FreeShipping: true,
            DayRentDiscount: true
        }
    });

    if (!promo) {
        throw new ResponseError(404, "Promo not exists");
    }

    if (dataPromo.title && dataPromo.title !== promo.title){
        const titleExist = await prismaClient.promo.findFirst({
            where: {title: dataPromo.title}
        });

        if(titleExist){
            throw new ResponseError(401, `${dataPromo.title} title already exists`);
        }
    }

    if (request.file) {
        await deleteCloudinaryFile(promo.image);
        dataPromo.image = `${process.env.API_URL}image/${request.file.filename}`;
    } else if (dataPromo.image) {
        await deleteCloudinaryFile(promo.image);
    }

    const { discount, dayRentDiscount, freeShipping, ...updateData } = dataPromo;

    const currentType = promo.type;
    const newType = updateData.type || currentType;

    const isSubPromoUpdate = discount || dayRentDiscount || freeShipping;

    if (!isSubPromoUpdate) {
        await prismaClient.promo.update({
            where: { id: promo.id },
            data: {
                ...updateData,
            }
        });
    } else {
        const relatedUpdateData = {
            Discount: discount ? { Discount: { update: discount } } : undefined,
            DayRentDiscount: dayRentDiscount ? { DayRentDiscount: { update: dayRentDiscount } } : undefined,
            FreeShipping: freeShipping ? { FreeShipping: { update: freeShipping } } : undefined,
        }[currentType];

        const relatedCreateData = {
            Discount: discount ? { Discount: { create: discount } } : undefined,
            DayRentDiscount: dayRentDiscount ? { DayRentDiscount: { create: dayRentDiscount } } : undefined,
            FreeShipping: freeShipping ? { FreeShipping: { create: freeShipping } } : undefined,
        }[newType];

        if (newType === currentType) {
            await prismaClient.promo.update({
                where: { id: promo.id },
                data: {
                    ...updateData,
                    ...relatedUpdateData
                }
            });
        } else {
            const validationSchemaMap = {
                Discount: createDiscountValidation,
                DayRentDiscount: createDayRentDiscountValidation,
                FreeShipping: createFreeShippingValidation
            };

            const selectedValidationSchema = validationSchemaMap[newType];
            if (selectedValidationSchema) {
                validate(selectedValidationSchema, request.body[newType.charAt(0).toLowerCase() + newType.slice(1)])
            }

            await prismaClient.promo.update({
                where: { id: promo.id },
                data: {
                    ...updateData,
                    ...relatedCreateData
                }
            });

            switch (promo.type) {
                case 'Discount':
                    await prismaClient.discount.deleteMany({
                        where: { promoId: promo.id }
                    });
                    break;
                case 'DayRentDiscount':
                    await prismaClient.dayRentDiscount.deleteMany({
                        where: { promoId: promo.id }
                    });
                    break;
                case 'FreeShipping':
                    await prismaClient.freeShipping.deleteMany({
                        where: { promoId: promo.id }
                    });
                    break;
                default:
                    console.warn(`Unknown old type: ${promo.type}`);
            }
        }
    }

    return await prismaClient.promo.findFirst({
        where: { id: dataPromo.id },
        include: {
            Discount: true,
            FreeShipping: true,
            DayRentDiscount: true
        }
    });
};


const remove = async (request) => {
    const data = validate(deleteValidation, request);
    const promo = await prismaClient.promo.findFirst({
        where:{id:data},
        select:{
            title: true,
            image: true
        }
    });

    if (!promo){
        throw new ResponseError(404, `${data.title} promo not exists`);
    }

    await deleteCloudinaryFile(promo.image);

    await prismaClient.promo.delete({
        where: {
            id:data
        }
    });

    return {
        message: `Remove ${promo.title} promo successfully`
    }
}

const removeMany = async (request) => {
    const data = validate(deleteSelectionValidation, request);
    const promo = await prismaClient.promo.findMany({
        where: {
            id: {
                in:data.ids
            }
        },
        select: {
            title: true,
            image: true
        }
    });

    if (promo.length !== data.ids.length){
        throw new ResponseError(404, `No promo found for deletion`);
    }

    for(const promoImage of promo){
        await deleteCloudinaryFile(promoImage.image);
    }

    const deletePromo = await prismaClient.promo.deleteMany({
        where: {
            id: {
                in:data.ids
            }
        }
    });

    return {
        message: `${deletePromo.count} news successfully deleted: ${promo.map(promos => promos.title).join(', ')}`
    }
}

const get = async (request) => {
    const data = validate(getValidation,request);
    const promo = await prismaClient.promo.findFirst({
        where: {id: data}
    });

    if(!promo){
        throw new ResponseError(404, `promo not exists`);
    }

    return promo;

}

const getAll = async () => {
    const promo = await prismaClient.promo.findMany();

    if (promo.length === 0){
        throw new ResponseError(404, `promo data not exists`);
    }

    return promo;
}


const pagination = async (request) => {
    const data = validate(paginationValidation, request);

    const skip = (data.page - 1) * data.dataRequest;

    const promo = await prismaClient.promo.findMany({
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy] : data.sortOrder
        }
    });

    const totalData = await prismaClient.promo.count();

    if(promo.length === 0) {
        throw new ResponseError(404, `promo Not Exists`);
    }

    return {
        data: promo,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData/data.dataRequest)
    }
}

const search = async (request) => {
    const data = validate(searchValidation, request);
    const skip = (data.page - 1) * data.dataRequest;

    const validEnumValues = ['Discount', 'FreeShipping', 'DayRentDiscount'];
    const typeFilter = validEnumValues.includes(data.search) 
        ? { type: { equals: data.search } }
        : {};

    const promo = await prismaClient.promo.findMany({
        where: {
            OR: [
                { title: { contains: data.search.toLowerCase() } },
                { description: { contains: data.search.toLowerCase() } },
                typeFilter 
            ].filter(Boolean)
        },
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy]: data.sortOrder
        }
    });

    const totalData = await prismaClient.promo.count({
        where: {
            OR: [
                { title: { contains: data.search.toLowerCase() } },
                { description: { contains: data.search.toLowerCase() } },
                typeFilter 
            ].filter(Boolean)
        }
    });

    if (promo.length === 0) {
        throw new ResponseError(404, `${data.search} promo Not Exists`);
    }

    return {
        data: promo,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData / data.dataRequest)
    };
};


export default {
    create,
    update,
    remove,
    removeMany,
    pagination,
    search,
    get,
    getAll
}


