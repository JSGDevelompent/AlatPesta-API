import modelService from "../service/model-service.js";

const createModel = async (req, res, next) => {
    try {
        const result = await modelService.createModelTools(req.body);
        res.status(200).json({
            data: result,
            message: `Model ${req.body.name} successfuly created!`
        })
    } catch (e) {
        next(e);
    }
}

const updateModel = async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name
        }
        const result = await modelService.updateModelTools(data);
        res.status(200).json({
            data: result,
            message: `Model successfuly updated!`
        })
    } catch (e) {
        next(e);
    }
}

const deleteModel = async (req, res, next) => {
    try {
        const result = await modelService.deleteModelTools(req.params.id);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const deleteManyModel = async (req, res, next) => {
    try {
        const result = await modelService.deleteManyModelTools(req.body);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const getModel = async (req, res, next) => {
    try {
        const result = await modelService.getModel(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllModel = async (req, res, next) => {
    try {
        const result = await modelService.getAllModel();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const paginationModel = async (req, res, next) => {
    try {
        const result = await modelService.paginationModelTools(req.body);
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

const searchModel = async (req, res, next) => {
    try {
        const result = await modelService.searchModelTools(req.body);
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
    createModel,
    updateModel,
    getModel,
    getAllModel,
    deleteManyModel,
    deleteModel,
    paginationModel,
    searchModel
}