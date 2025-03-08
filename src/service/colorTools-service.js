import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
    createColorToolsValidation,
    updateColorToolsValidation,
    deleteColorToolsSelectionValidation,
    getColorToolsValidation,
    deleteColorToolsValidation,
    searchColorToolsValidation,
    paginationColorToolsValidation
} from "../validation/colorTools-validation.js";

const createColorTools = async (request) => {
    const data = validate(createColorToolsValidation, request);
    const color = await prismaClient.colorTools.findFirst({
        where: {
            name: data.name
        }
    });

    if (color) {
        throw new ResponseError(400, "Color name already exists");
    }
    return prismaClient.colorTools.create({
        data: data,
        include: {
            Tools: true
        }
    });
}

const updateColorTools = async (request) => {
    const data = validate(updateColorToolsValidation, request);
    const color = await prismaClient.colorTools.findFirst({
        where: {
            id: data.id
        },
        select: {
            name: true
        }
    });
    if (!color) {
        throw new ResponseError(404, "Color not found");
    }

    let colorExist;
    if(data.name)
    colorExist = await prismaClient.colorTools.findFirst({
        where: {
            name: data.name
        }
    });

    if (colorExist) {
        throw new ResponseError(400, `Color ${data.name} already exists`);
    }

    const updateData = {
        name: data.name,
        ...(data.colors && { colors: data.colors }),
        options: data.options
    };

    return prismaClient.colorTools.update({
        where: {
            id: data.id
        },
        data: updateData,
        include: {
            Tools: true
        }
    });
}

const deleteColorTools = async (request) => {
    const data = validate(deleteColorToolsValidation, request);
    
    const color = await prismaClient.colorTools.findUnique({
        where: {
            id: data
        },
        include: {
            Tools: true
        }
    });
    
    if (!color) {
        throw new ResponseError(404, "Color not found");
    }

    if (color.Tools && color.Tools.length > 0) {
        throw new ResponseError(400, `Cannot delete Color Tools ${color.name} as it has associated Tools.`);
    }

    await prismaClient.colorTools.delete({
        where: {
            id: data
        }
    });

    return {
        message: `Color Tools ${color.name} successfully deleted`
    }
}


const deleteManyColorTools = async (request) => {
    const data = validate(deleteColorToolsSelectionValidation, request);

    // Dapatkan semua colorTools dengan id yang dicari dan termasuk Tools terkait
    const colorsToDelete = await prismaClient.colorTools.findMany({
        where: {
            id: {
                in: data.ids
            }
        },
        include: {
            Tools: true
        }
    });

    if (colorsToDelete.length === 0) {
        throw new ResponseError(404, "No color tools found for deletion");
    }

    const hasAssociatedTools = colorsToDelete.find(color => color.Tools && color.Tools.length > 0);
    if (hasAssociatedTools) {
        throw new ResponseError(400, `Cannot delete Color Tools ${hasAssociatedTools.name} as it has associated Tools.`);
    }

    const deleteColors = await prismaClient.colorTools.deleteMany({
        where: {
            id: {
                in: data.ids
            }
        }
    });

    return {
        message: `${deleteColors.count} color tools successfully deleted: ${colorsToDelete.map(color => color.name).join(', ')}`
    };
}

const getColor = async (request) => {
    const data = validate(getColorToolsValidation, request);
    const color = await prismaClient.colorTools.findUnique({
        where: {
            id: data
        },
        include: {
            Tools: true
        }
    });

    if (!color) throw new ResponseError(404, `Tools color not found`);

    return color;
}

const getAllColor = async () => {
    const color = await prismaClient.colorTools.findMany({
        include: {
            Tools: true
        }
    });

    return color;
}

const paginationColorTools = async (request) => {
    const pagination = validate(paginationColorToolsValidation, request);
    const skip = (pagination.page - 1) * pagination.dataRequest;
    const color = await prismaClient.colorTools.findMany({
        skip: skip,
        take: pagination.dataRequest,
        orderBy: {
            [pagination.sortBy]: pagination.sortOrder
        },
        include: {
            Tools: true
        }
    });

    const totalData = await prismaClient.colorTools.count();

    if (color.length === 0) {
        throw new ResponseError(404, `Color Not Found`);
    }

    return {
        data: color,
        totalData: totalData,
        currentPage: pagination.page,
        totalPages: Math.ceil(totalData / pagination.dataRequest)
    };
}

const searchColor = async (request) => {
    const search = validate(searchColorToolsValidation, request);
    const skip = (search.page - 1) * search.dataRequest;
    const options = !isNaN(parseInt(search.search)) ? parseInt(search.search) : 999999999;
    const color = await prismaClient.colorTools.findMany({
        where: {
            OR: [
                {name: {contains: search.search.toLowerCase()}},
                {options: options}

            ]
        },
        skip: skip,
        take: search.dataRequest,
        orderBy: {
            [search.sortBy]: search.sortOrder
        },
        include: {
            Tools: true
        }
    });

    const totalData = await prismaClient.colorTools.count();

    if (color.length === 0) {
        throw new ResponseError(404, `no color data about ${search.search}`);
    }

    return {
        data: color,
        totalData: totalData,
        currentPage: search.page,
        totalPages: Math.ceil(totalData / search.dataRequest)
    };
}

export default {
    createColorTools,
    updateColorTools,
    getAllColor,
    getColor,
    paginationColorTools,
    deleteColorTools,
    deleteManyColorTools,
    searchColor
}