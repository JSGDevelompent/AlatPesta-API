import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import {
    createValidation,
    updateValidation,
    getValidation,
    deleteValidation,
    deleteSelectionValidation,
    paginationValidation,
    searchValidation
} from "../validation/QandA-validation.js";

const create = async (request) => {
    const data = validate(createValidation, request);
    
    const QandA = await prismaClient.questionsAndAnswers.findFirst({
        where: {
            title: data.title
        }
    });
    
    if (QandA) {
        throw new ResponseError(401, `QandA whit title ${data.title} already exists`);
    }

    return prismaClient.questionsAndAnswers.create({
        data: data
    });
}


const update = async (request) => {
    const data = validate(updateValidation, request);
    const QandA = await prismaClient.questionsAndAnswers.findUnique({
        where: {
            id: data.id
        }
    });
    if (!QandA) {
        throw new ResponseError(404, `QandA not found`)
    }
    if (data.title)
    {
        const QandAExists = await prismaClient.questionsAndAnswers.findFirst({
            where: {
                title: data.title
            }
        });
        
        if (QandAExists && data.id !== QandAExists.id) {
            throw new ResponseError(401, `QandA whit title ${data.title} already exists`);
        }
    }
    const {id, ...dataUpdate} = data;
    return prismaClient.questionsAndAnswers.update({
        where: {id:QandA.id},
        data: dataUpdate
    });
}

const remove = async (request) => {
    const data = validate(deleteValidation, request);
    const QandA = await prismaClient.questionsAndAnswers.findFirst({
        where:{id:data}
    });

    if (!QandA){
        throw new ResponseError(404, `QandA not exists`);
    }

    await prismaClient.questionsAndAnswers.delete({
        where: {
            id:data
        }
    });

    return {
        message: `Remove QandA successfully`
    }
}

const removeMany = async (request) => {
    const data = validate(deleteSelectionValidation, request);
    const QandA = await prismaClient.questionsAndAnswers.findMany({
        where: {
            id: {
                in:data.ids
            }
        }
    });

    if (QandA.length !== data.ids.length){
        throw new ResponseError(404, `Data not Valid`);
    }

    const deleteQandA = await prismaClient.questionsAndAnswers.deleteMany({
        where: {
            id: {
                in:data.ids
            }
        }
    });
    
    return {
        message: `${deleteQandA.count} QandA successfully deleted:  ${QandA.map(qa => qa.title).join(', ')}`
    }
}

const get = async (request) => {
    const data = validate(getValidation,request);
    const QandA = await prismaClient.questionsAndAnswers.findFirst({
        where: {id: data}
    });
    
    if(!QandA){
        throw new ResponseError(404, `QandA not exists`);
    }

    return QandA;

}

const getAll = async () => {
    const QandA = await prismaClient.questionsAndAnswers.findMany();

    if (QandA.length === 0){
        throw new ResponseError(404, `QandA data not exists`);
    }

    return QandA;
}


const pagination = async (request) => {
    const data = validate(paginationValidation, request);

    const skip = (data.page - 1) * data.dataRequest;

    const QandA = await prismaClient.questionsAndAnswers.findMany({
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy] : data.sortOrder
        }
    });

    const totalData = await prismaClient.questionsAndAnswers.count();

    if(QandA.length === 0) {
        throw new ResponseError(404, `QandA Not Exists`);
    }

    return {
        data: QandA,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData/data.dataRequest)
    }
}

const search = async (request) => {
    const data = validate(searchValidation, request);
    const skip = (data.page - 1) * data.dataRequest;
    const QandA = await prismaClient.questionsAndAnswers.findMany({
        where: {
            OR: [
                { answer    : {contains: data.search.toLowerCase()} },
                { question  : {contains: data.search.toLowerCase()} },
                { title     : {contains: data.search.toLowerCase()} }
            ]
        },
        skip: skip,
        take: data.dataRequest,
        orderBy: {
            [data.sortBy] : data.sortOrder
        }
    });

    const totalData = await prismaClient.questionsAndAnswers.count({
        where: {
            OR: [
                { answer    : {contains: data.search.toLowerCase()} },
                { question  : {contains: data.search.toLowerCase()} },
                { title     : {contains: data.search.toLowerCase()} }
            ]
        }
    });

    if(QandA.length === 0) {
        throw new ResponseError(404, `${data.search}QandA Not Exists`);
    }

    return {
        data: QandA,
        totalData: totalData,
        currentPage: data.page,
        totalPages: Math.ceil(totalData/data.dataRequest)
    }
}

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