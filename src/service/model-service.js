import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
    createModelToolsValidation,
    updateModelToolsValidation,
    deleteModelToolsSelectionValidation,
    deleteModelToolsValidation,
    getModelToolsValidation,
    paginationModelToolsValidation,
    searchModelToolsValidation,
} from "../validation/model-validation.js";

const createModelTools = async (request) => {
    const data = validate(createModelToolsValidation, request);
    const model = await prismaClient.modelTools.findUnique({
        where: {
            name: data.name
        }
    });

    if (model) {
        throw new ResponseError(400, "Model already exists");
    }
    return prismaClient.modelTools.create({
        data: {
            name: data.name
        },
        include: {
            Tools:true
        }
    });
}

const updateModelTools = async (request) => {
    const data = validate(updateModelToolsValidation, request);
    const model = await prismaClient.modelTools.findFirst({
        where: {
            id: data.id
        },
        select: {
            name: true
        }
    });
    if (!model) {
        throw new ResponseError(404, "Model not found");
    }

    const modelExist = await prismaClient.modelTools.findUnique({
        where: {
            name: data.name
        }
    });

    if (modelExist) {
        throw new ResponseError(400, "Model already exists");
    }

    return prismaClient.modelTools.update({
        where: {
            id: data.id
        },
        data: {
            name: data.name
        }
        ,
        include: {
            Tools:true
        }
    });
}

const deleteModelTools = async (request) => {
    const data = validate(deleteModelToolsValidation, request);
    const model = await prismaClient.modelTools.findUnique({
        where: {
            id: data
        },
        select: {
            name: true
        }
    });
    if (!model) {
        throw new ResponseError(404, "Model not found");
    }

    await prismaClient.modelTools.delete({
        where: {
            id: data
        }
    });

    return {
        message: `Model Tools ${model.name} successfully deleted`
    }
}

const deleteManyModelTools = async (request) => {
    const data = validate(deleteModelToolsSelectionValidation, request);

     const modelsToDelete = await prismaClient.modelTools.findMany({
        where: {
            id: {
                in: data.ids
            }
        },
        select: {
            name: true
        }
    });

    if (modelsToDelete.length === 0) {
        throw new ResponseError(404, "No model tools found for deletion");
    }

    const deleteModels = await prismaClient.modelTools.deleteMany({
        where: {
            id: {
                in: data.ids
            }
        }
    });

    return {
        message: `${deleteModels.count} model tools successfully deleted: ${modelsToDelete.map(model => model.name).join(', ')}`
    };
}

const getModel = async (request) => {
    const data = validate(getModelToolsValidation, request);
    const model = await prismaClient.modelTools.findUnique({
        where: {
            id: data
        }
        ,
        include: {
            Tools:true
        }
    });

    if (!model) throw new ResponseError(404, `Tools Model not found`);

    return model;
}

const getAllModel = async () => {
    const model = await prismaClient.modelTools.findMany({
        include: {
            Tools:true
        }
    });

    return model;
}

const paginationModelTools = async (request) => {
    const pagination = validate(paginationModelToolsValidation, request);
    const skip = (pagination.page - 1) * pagination.dataRequest;
    const model = await prismaClient.modelTools.findMany({
        skip: skip,
        take: pagination.dataRequest,
        orderBy: {
            [pagination.sortBy]: pagination.sortOrder
        }
    });

    const totalData = await prismaClient.modelTools.count();

    if (model.length === 0) {
        throw new ResponseError(404, `Model Not Found`);
    }

    return {
        data: model,
        totalData: totalData,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalData / pagination.dataRequest)
    };
}


const searchModelTools = async (request) => {
    const search = validate(searchModelToolsValidation, request);
    const skip = (search.page - 1) * search.dataRequest;
    const model = await prismaClient.modelTools.findMany({
        where: {
            name: { contains: search.search.toLowerCase() }
        },
        skip: skip,
        take: search.dataRequest,
        orderBy: {
            [search.sortBy]: search.sortOrder
        }
    });

    const totalData = await prismaClient.modelTools.count({
        where: {
            name: { contains: search.search.toLowerCase() }
        }
    });

    if (model.length === 0) {
        throw new ResponseError(404, `no model data about ${search.search}`);
    }

    return {
        data: model,
        totalData: totalData,
        currentPage: search.page,
        totalPages: Math.ceil(totalData / search.dataRequest)
    };
}


export default {
    createModelTools,
    updateModelTools,
    deleteModelTools,
    deleteManyModelTools,
    getModel,
    getAllModel,
    paginationModelTools,
    searchModelTools
}