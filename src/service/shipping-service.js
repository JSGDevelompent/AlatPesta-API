import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
    createValidation,
    updateValidation
} from "../validation/shippingPrice-validation.js";


const create = async (request) => {
    const data = validate(createValidation, request.body);
    const Count = await prismaClient.shippingPrice.count();
    if (Count !== 0) {
        throw new ResponseError(405, "What do you want to do?");
    }

    return prismaClient.shippingPrice.create({
        data: {
            id: 1,
            ...data
        }
    });
};

const update = async (request) => {
    const data = validate(updateValidation, request.body);
    const SHP = await prismaClient.shippingPrice.findFirst({
        where: { id: 1 }
    });

    if (!SHP) {
        throw new ResponseError(404, "Shipping Price not found");
    }

    return prismaClient.shippingPrice.update({
        where: { id: 1 },
        data: data
    });
};

const get = async () => {
    const count = await prismaClient.shippingPrice.count();

    if (count === 0) {
        throw new ResponseError(400, "No data available in company table");
    }

    const result = await prismaClient.shippingPrice.findFirst({
        where: { id: 1 },
        select:{
            type: true,
            price: true,
            distance: true
        }
    });

    if (!result) {
        throw new ResponseError(400, "Data is not found");
    }

    return result;
};

export default {
    create,
    update,
    get
}