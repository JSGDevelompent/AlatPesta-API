import typeService from "../service/type-service.js";

const createType = async (req, res, next) => {
    try {
        const result = await typeService.createTypeTools(req.body);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const updateType = async (req, res, next) => {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name
        }
        const result = await typeService.updateTypeTools(data);
        res.status(200).json({
            data: result,
            message: `Model successfuly updated!`
        })
    } catch (e) {
        next(e);
    }
}

const deleteType = async (req, res, next) => {
    try {
        const result = await typeService.deleteTypeTools(req.params.id);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const deleteManyType = async (req, res, next) => {
    try {
        const result = await typeService.deleteManyTypeTools(req.body);
        res.status(200).json({
            message: result.message
        });
    } catch (e) {
        next(e);
    }
}

const getType = async (req, res, next) => {
    try {
        const result = await typeService.getType(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAllType = async (req, res, next) => {
    try {
        const result = await typeService.getAllType();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const paginationType = async (req, res, next) => {
    try {
        const result = await typeService.paginationTypeTools(req.body);
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

const searchType = async (req, res, next) => {
    try {
        const result = await typeService.searchTypeTools(req.body);
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
    createType,
    updateType,
    getAllType,
    getType,
    paginationType,
    searchType,
    deleteManyType,
    deleteType
}
