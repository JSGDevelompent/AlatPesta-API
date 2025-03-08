import colorToolsService from "../service/colorTools-service.js";


const createColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.createColorTools(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const updateColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.updateColorTools(req.body);
        res.status(200).json({
            data: result,
            message: `Model successfuly updated!`
        })
    } catch (e) {
        next(e);
    }
}

const deleteColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.deleteColorTools(req.params.id);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const deleteManyColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.deleteManyColorTools(req.body);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const getColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.getColor(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.getAllColor();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const paginationColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.paginationColorTools(req.body);
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

const searchColor = async (req, res, next) => {
    try {
        const result = await colorToolsService.searchColor(req.body);
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
    createColor,
    updateColor,
    deleteColor,
    deleteManyColor,
    paginationColor,
    searchColor,
    getAllColor,
    getColor
}

