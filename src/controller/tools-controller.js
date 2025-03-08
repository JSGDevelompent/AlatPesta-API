import toolsService from "../service/tools-service.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";

const createTools = async (req, res, next) => {
    try {
        const result = await toolsService.createTools(req);
        res.status(200).json({
            data: result,
            message: `${result.name} successfully created`
        });
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const updateTools = async (req, res, next) => {
    try {
        const result = await toolsService.updateTools(req);
        res.status(200).json({
            data: result,
            message: `Tool successfully updated`
        });
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const deleteTools = async (req, res, next) => {
    try {
        const result = await toolsService.deleteTool(req.params.id);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const deleteManyTools = async (req, res, next) => {
    try {
        const result = await toolsService.deleteManyTool(req.body);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const getTools = async (req, res, next) => {
    try {
        const result = await toolsService.getTool(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllTools = async (req, res, next) => {
    try {
        const result = await toolsService.getAllTools();
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const paginationTools = async (req, res, next) => {
    try {
        const result = await toolsService.paginationTools(req.body);
        res.status(200).json({
            data: result.data,
            totalData: result.totalData,
            currentPage: result.currentPage,
            totalPages: result.totalPages
        });
    } catch (e) {
        next(e);
    }
}

const searchTools = async (req, res, next) => {
    try {
        const result = await toolsService.searchTools(req.body);
        res.status(200).json({
            data: result.data,
            totalData: result.totalData,
            currentPage: result.currentPage,
            totalPages: result.totalPages
        });
    } catch (e) {
        next(e);
    }
}

export default {
    createTools,
    updateTools,
    deleteManyTools,
    deleteTools,
    getTools,
    getAllTools,
    paginationTools,
    searchTools
}