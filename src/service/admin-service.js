import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt, { hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import {
    createAdminValidation,
    loginAdminValidation,
    updateUsernameAdminValidation,
    updatePasswordAdminValidation
} from "../validation/admin-validation.js";
import { request } from "express";


const checkAdmin = async () => {
    const Admin = await prismaClient.admin.count();

    if (Admin === 0) {
        throw new ResponseError(404, "Register First");
    }
}

const createAdmin = async (request) => {
    const data = validate(createAdminValidation, request);
    const Admin = await prismaClient.admin.count();

    if (Admin !== 0) {
        throw new ResponseError(405, "What do you want to do?");
    }
    data.id = 1;
    data.token = uuid().toString() + new Date().toString();
    const tokenLimit = new Date();
    tokenLimit.setHours(tokenLimit.getHours() + 336);
    data.limitToken = tokenLimit;
    data.password = await bcrypt.hash(data.password, 10);
    return prismaClient.admin.create({
        data: data,
        select: {
            token: true
        }
    });
}

const loginAdmin = async (request) => {
    const data = validate(loginAdminValidation, request);

    const Admin = await prismaClient.admin.findUnique({
        where: {
            username: data.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if (!Admin) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(data.password, Admin.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const tokenLimit = new Date();
    tokenLimit.setHours(tokenLimit.getHours() + 336);
    const token = uuid().toString() + new Date().toString();

    return prismaClient.admin.update({
        where: {
            username: Admin.username
        },
        data: {
            token: token,
            limitToken: tokenLimit
        },
        select: {
            token: true
        }
    });
}

const updatePasswordAdmin = async (request) => {
    const data = validate(updatePasswordAdminValidation, request);
    const Admin = await prismaClient.admin.findUnique({
        where: {
            id: 1
        },
        select: {
            password: true
        }
    });

    const isPasswordValid = await bcrypt.compare(data.oldPassword, Admin.password);
    const isNewPasswordSame = await bcrypt.compare(data.newPassword, Admin.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Password wrong");
    }
    if (isNewPasswordSame) {
        throw new ResponseError(400, "The password cannot be the same as the initial password");
    }
    data.newPassword = await bcrypt.hash(data.newPassword, 10);
    return prismaClient.admin.update({
        where: {
            id: 1
        },
        data: {
            password: data.newPassword,
            token: null
        }
    });
}

const updateUsernameAdmin = async (request) => {
    const data = validate(updateUsernameAdminValidation, request);
    const Admin = await prismaClient.admin.findUnique({
        where: {
            id: 1
        },
        select: {
            username: true,
            password: true
        }
    });


    const isPasswordValid = await bcrypt.compare(data.password, Admin.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Password wrong");
    }

    if (data.username === Admin.username) {
        throw new ResponseError(400, "The username cannot be the same as the initial username");
    }
    return prismaClient.admin.update({
        where: {
            id: 1
        },
        data: {
            username: data.username,
            token: null
        }
    });
}

export default {
    createAdmin,
    loginAdmin,
    updatePasswordAdmin,
    updateUsernameAdmin,
    checkAdmin
}
