import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
import {
    createToolsValidation,
    updateToolsValidation,
    deleteToolsSelectionValidation,
    deleteToolsValidation,
    getToolsValidation,
    paginationToolsValidation,
    searchToolsValidation,
} from "../validation/tools-validation.js";
import dotenv from 'dotenv';
dotenv.config();

const findItemOrThrow = async (model, name, errorMessage) => {
    const item = await model.findFirst({
        where: {
            OR: [
                { id: typeof name === "number" ? name : undefined },
                { name: typeof name === "string" ? name : undefined },
            ],
        },
    });
    if (!item) throw new ResponseError(404, errorMessage);
    return item;
};



const createTools = async (request) => {
    const data = validate(createToolsValidation, request.body);

    //check if the tool already exists
    const tool = await prismaClient.tools.findFirst({
        where: {
            name: data.name
        }
    });

    if (tool) {
        throw new ResponseError(409, `Tool with name "${data.name}" already exists`);
    }
    

    // Menambahkan URL gambar jika tersedia
    if (request.file) {
        data.image = request.cloudinary.secure_url;
    }
    if (!data.image) {
        throw new ResponseError(400, "image is required");
    }

    // Mendapatkan `type`, `model`, dan `color` dari database
    const type = await findItemOrThrow(prismaClient.typeTools, data.typeName, `Type "${data.typeName}" not found`);
    const model = await findItemOrThrow(prismaClient.modelTools, data.modelName, `Model "${data.modelName}" not found`);
    let color = null;
    if (data.colorName) {
        color = await findItemOrThrow(prismaClient.colorTools, data.colorName, `Color "${data.colorName}" not found`);
        data.colorId = color.id; // Mengatur `colorId` di dalam `data`
    }

    return prismaClient.tools.create({
        data: {
            name: data.name,
            image: data.image,
            description: data.description,
            price: data.price,
            typeId: type.id,
            modelId: model.id,
            colorsId: data.colorId || null,
        },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });
};


const updateTools = async (request) => {
    const data = validate(updateToolsValidation, request.body);

    const tools = await prismaClient.tools.findFirst({
        where: {
            id: data.id
        },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    if (!tools) {
        throw new ResponseError(404, `Tool not found`);
    }

    if (request.file) {
        data.image = request.cloudinary.secure_url;
    }

    if (data.image) {
        await deleteCloudinaryFile(tools.image);
    }

    if (data.typeName) {
        const type = await findItemOrThrow(prismaClient.typeTools, data.typeName, `Type "${data.typeName}" not found`);
        data.typeId = type.id; // Masukkan nilai ID langsung
        delete data.typeName;
    }

    if (data.modelName) {
        const model = await findItemOrThrow(prismaClient.modelTools, data.modelName, `Model "${data.modelName}" not found`);
        data.modelId = model.id; // Masukkan nilai ID langsung
        delete data.modelName;
    }

    if (data.colorName) {
        const color = await findItemOrThrow(prismaClient.colorTools, data.colorName, `Color "${data.colorName}" not found`);
        data.colorsId = color.id; // Masukkan nilai ID langsung
        delete data.colorName;
    }

    const { id, ...updateData } = data; 

    return  prismaClient.tools.update({
        where: { id },
        data: {
            ...updateData
        },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });
}

const deleteTool = async (request) => {
    const data = validate(deleteToolsValidation, request);
    const tool = await prismaClient.tools.findFirst({
        where: { id: data },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    if (!tool) throw new ResponseError(404, 'Tool not found');

    await deleteCloudinaryFile(tool.image);

    for (const subTool of tool.subTools) {
        for (const image of subTool.images) {
            await deleteCloudinaryFile(image.image);
        }
    }

    await prismaClient.tools.delete({
        where: {
            id: data
        }
    });

    return {
        message: `Tool ${tool.name} successfully deleted`
    }
}

const deleteManyTool = async (request) => {
    const data = validate(deleteToolsSelectionValidation, request);

        const toolsToDelete = await prismaClient.tools.findMany({
        where: {
            id: {
                in: data.ids
            }
        },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    if (toolsToDelete.length === 0) {
        throw new ResponseError(404, "No tools found for deletion");
    }

    for (const tool of toolsToDelete) {
        await deleteCloudinaryFile(tool.image); 
        for (const subTool of tool.subTools) {
            for (const image of subTool.images) {
                await deleteCloudinaryFile(image.image);
            }
        }
    }

    const deleteTools = await prismaClient.tools.deleteMany({
        where: {
            id: {
                in: data.ids
            }
        }
    });

    return {
        message: `${deleteTools.count} model tools successfully deleted: ${toolsToDelete.map(tool => tool.name).join(', ')}`
    };
}

const getTool = async (request) => {
    const data = validate(getToolsValidation, request);
    const tool = await prismaClient.tools.findFirst({
        where: { id: data },
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    if (!tool) {
        throw new ResponseError(404, `Tool not found`);
    }
    return tool;
}

const getAllTools = async () => {
    const tools = await prismaClient.tools.findMany({
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    return tools;
}

const paginationTools = async (request) => {
    const pagination = validate(paginationToolsValidation, request);
    const skip = (pagination.page - 1) * pagination.dataRequest;
    const orderBy = ["modelTools", "typeTools", "subTools"].includes(pagination.sortBy)
        ? { [pagination.sortBy]: { name: pagination.sortOrder } }
        : { [pagination.sortBy]: pagination.sortOrder };

    const Tools = await prismaClient.tools.findMany({
        skip: skip,
        take: pagination.dataRequest,
        orderBy: orderBy,
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    const totalData = await prismaClient.tools.count();

    if (Tools.length === 0) {
        throw new ResponseError(404, `Tools Not Found`);
    }

    return {
        data: Tools,
        totalData: totalData,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalData / pagination.dataRequest)
    };
};

const searchTools = async (request) => {
    const search = validate(searchToolsValidation, request);
    const skip = (search.page - 1) * search.dataRequest;
    const price = !isNaN(parseInt(search.search)) ? parseInt(search.search) : 999999999;
    const orderBy = ["modelTools", "typeTools", "subTools"].includes(search.sortBy)
        ? { [search.sortBy]: { name: search.sortOrder } }
        : { [search.sortBy]: search.sortOrder };

    const tools = await prismaClient.tools.findMany({
        where: {
            OR: [
                { name: { contains: search.search.toLowerCase() } },
                { modelTools: { name: { contains: search.search.toLowerCase() } } },
                { typeTools: { name: { contains: search.search.toLowerCase() } } },
                { subTools: { some: { name: { contains: search.search.toLowerCase() } } } },
                { price: price }
            ]
        },
        skip: skip,
        take: search.dataRequest,
        orderBy: orderBy,
        include: {
            modelTools: true,
            typeTools: true,
            subTools: true,
            colorsTools: true
        }
    });

    const totalData = await prismaClient.tools.count({
        where: {
            OR: [
                { name: { contains: search.search.toLowerCase() } },
                { modelTools: { name: { contains: search.search.toLowerCase() } } }, // sesuai relasi many-to-one
                { typeTools: { name: { contains: search.search.toLowerCase() } } },  // sesuai relasi many-to-one
                { subTools: { some: { name: { contains: search.search.toLowerCase() } } } }, // sesuai relasi one-to-many
                { price: price }
            ]
        }
    });

    if (tools.length === 0) {
        throw new ResponseError(404, `No tools data about ${search.search}`);
    }

    return {
        data: tools,
        totalData: totalData,
        currentPage: search.page,
        totalPages: Math.ceil(totalData / search.dataRequest)
    };
}

export default {
    createTools,
    updateTools,
    deleteManyTool,
    deleteTool,
    getTool,
    getAllTools,
    paginationTools,
    searchTools
}