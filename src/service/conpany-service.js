import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
import {
    updateCompanyValidation,
    createCompanyValidation
} from "../validation/company-validation.js";
import dotenv from 'dotenv';
dotenv.config();

const createCompany = async (request) => {
    console.log(request);
    const data = validate(createCompanyValidation, request.body);
    const companyCount = await prismaClient.company.count();
    if (companyCount !== 0) {
        throw new ResponseError(405, "What do you want to do?");
    }
    if (request.file) {
        data.icon = request.cloudinary.secure_url;
    }
    else
    {
        throw new ResponseError(400, `Required icon`)
    }
    data.id = 1;

    return prismaClient.company.create({
        data: data
    });
};

const updateCompany = async (request) => {
    const data = validate(updateCompanyValidation, request.body);
    const company = await prismaClient.company.findFirst({
        where: { id: 1 },
        select: { icon: true }
    });

    if (!company) {
        throw new ResponseError(404, "Company not found");
    }

    if (request.file) {
        if (company.icon) await deleteCloudinaryFile(company.icon);
        data.icon = request.cloudinary.secure_url;
    } else if (data.icon) {
        if (company.icon) await deleteCloudinaryFile(company.icon);
    }

    delete data.id;
    delete data.createAt;
    delete data.updateAt;

    return prismaClient.company.update({
        where: { id: 1 },
        data: data
    });
};

const get = async () => {
    const count = await prismaClient.company.count();

    if (count === 0) {
        throw new ResponseError(400, "No data available in company table");
    }

    const result = await prismaClient.company.findFirst({
        where: { id: 1 }
    });

    if (!result) {
        throw new ResponseError(400, "Data is not found");
    }

    return result;
};

export default {
    createCompany,
    updateCompany,
    get
};
