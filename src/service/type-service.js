import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
    createTypeToolsValidation,
    updateTypeToolsValidation,
    deleteTypeToolsSelectionValidation,
    deleteTypeToolsValidation,
    getTypeToolsValidation,
    paginationTypeToolsValidation,
    searchTypeToolsValidation,
} from "../validation/type-validation.js";

// Type

const createTypeTools = async (request) => {
    const data = validate(createTypeToolsValidation, request);
    const model = await prismaClient.typeTools.findUnique({
        where: {
            name: data.name
        }
    });

    if (model) {
        throw new ResponseError(400, "Model already exists");
    }
    return prismaClient.typeTools.create({
        data: {
            name: data.name
        },
        include: {
            Tools:true
        }
    });
}

const updateTypeTools = async (request) => {
    const data = validate(updateTypeToolsValidation, request);
    const type = await prismaClient.typeTools.findUnique({
        where: {
            id: data.id
        }
    });
    if (!type) {
        throw new ResponseError(404, "type not found");
    }

    const typeExist = await prismaClient.typeTools.findUnique({
        where: {
            name: data.name
        },
        include: {
            Tools:true
        }
    });

    if (typeExist) {
        throw new ResponseError(400, "type already exists");
    }

    return prismaClient.typeTools.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        },
        include: {
            Tools:true
        }
    });
}

const deleteTypeTools = async (request) => {
    const data = validate(deleteTypeToolsValidation, request);
    const type = await prismaClient.typeTools.findUnique({
        where: {
            id: data
        },
        select: {
            name: true
        }
    });
    if (!type) {
        throw new ResponseError(404, "type not found");
    }

    await prismaClient.typeTools.delete({
        where: {
            id: data
        }
    });

    return {
        message: `Type Tools ${type.name} successfully deleted`
    }
}

const deleteManyTypeTools = async (request) => {
    const data = validate(deleteTypeToolsSelectionValidation, request);

    const typesToDelete = await prismaClient.typeTools.findMany({
        where: {
            id: {
                in: data.ids
            }
        },
        select: {
            name: true
        }
    });
    if (typesToDelete.length === 0) {
        throw new ResponseError(404, "No type tools found for deletion");
    }

    const deleteModels = await prismaClient.typeTools.deleteMany({
        where: {
            id: {
                in: data.ids
            }
        }
    });

    return {
        message: `${deleteModels.count} model tools successfully deleted: ${typesToDelete.map(type => type.name).join(', ')}`
    };
}


const getType = async (request) => {
    const data = validate(getTypeToolsValidation, request);
    const model = await prismaClient.typeTools.findUnique({
        where: {
            id: data
        },
        include: {
            tools:true
        }
    });

    if (!model) throw new ResponseError(404, `Tools Type not found`);

    return model;
}

const getAllType = async () => {

    const type = await prismaClient.typeTools.findMany({
        
        include: {
            Tools:true
        }
    });

    return type;
}


const paginationTypeTools = async (request) => {
    const pagination = validate(paginationTypeToolsValidation, request);
    const skip = (pagination.page - 1) * pagination.dataRequest;
    const Type = await prismaClient.TypeTools.findMany({
        skip: skip,
        take: pagination.dataRequest,
        orderBy: {
            [pagination.sortBy]: pagination.sortOrder
        }
    });

    const totalData = await prismaClient.TypeTools.count();

    if (Type.length === 0) {
        throw new ResponseError(404, `Type Not Found`);
    }

    return {
        data: Type,
        totalData: totalData,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalData / pagination.dataRequest)
    };
}

const searchTypeTools = async (request) => {
    const search = validate(searchTypeToolsValidation, request);
    const skip = (search.page - 1) * search.dataRequest;
    const type = await prismaClient.typeTools.findMany({
        where: {
            name: { contains: search.search.toLowerCase() }
        },
        skip: skip,
        take: search.dataRequest,
        orderBy: {
            [search.sortBy]: search.sortOrder
        }
    });

    const totalData = await prismaClient.typeTools.count({
        where: {
            name: { contains: search.search.toLowerCase() }
        }
    });

    if (type.length === 0) {
        throw new ResponseError(404, `no type data about ${search.search}`);
    }

    return {
        data: type,
        totalData: totalData,
        currentPage: search.page,
        totalPages: Math.ceil(totalData / search.dataRequest)
    };
}

export default {
    createTypeTools,
    updateTypeTools,
    deleteManyTypeTools,
    deleteTypeTools,
    getType,
    getAllType,
    paginationTypeTools,
    searchTypeTools
}

