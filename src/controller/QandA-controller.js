import QandAService from "../service/QandA-service.js";

const create = async (req, res, next) => {
    try {
        const result = await QandAService.create(req.body);
        res.status(200).json({
            data: result,
            message: `QandA created successfully`
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req,res,next) => {
    try {
        req.body.id = req.params.id;
        const result = await QandAService.update(req.body);
        res.status(200).json({
            data:result,
            message: `QandA successfuly updated!`
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await QandAService.remove(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const removeMany = async (req, res, next) => {
    try {
        const result = await QandAService.removeMany(req.body);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await QandAService.get(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await QandAService.getAll();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const pagination = async (req, res, next) => {
    try {
        const result =  await QandAService.pagination(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const result = await QandAService.search(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    remove,
    removeMany,
    get,
    getAll,
    pagination,
    search
}