import newsService from "../service/news-service.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
const create = async (req, res, next) => {
    try {
        const result = await newsService.create(req);
        res.status(200).json({
            data: result,
            message: `${req.body.title} news created successfully`
        })
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const update = async (req,res,next) => {
    try {
        req.body.id = req.params.id;
        const result = await newsService.update(req);
        res.status(200).json({
            data:result,
            message: `News successfuly updated!`
        })
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await newsService.remove(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const removeMany = async (req, res, next) => {
    try {
        const result = await newsService.removeMany(req.body);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await newsService.get(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await newsService.getAll();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const pagination = async (req, res, next) => {
    try {
        const result =  await newsService.pagination(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const result = await newsService.search(req.body);
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