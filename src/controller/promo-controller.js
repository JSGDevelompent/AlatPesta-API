import promoService from "../service/promo-service.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";
const create = async (req, res, next) => {
    try {
        const result = await promoService.create(req);
        res.status(200).json({
            data: result,
            message: ` Promo ${req.body.title} created successfully`
        })
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const update = async (req,res,next) => {
    try {
        req.body.id = req.params.id;
        const result = await promoService.update(req);
        res.status(200).json({
            data:result,
            message: `Promo successfuly updated!`
        })
    } catch (e) {
        if (req.file) await deleteCloudinaryFile(req.cloudinary.secure_url);
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await promoService.remove(req.params.id);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const removeMany = async (req, res, next) => {
    try {
        const result = await promoService.removeMany(req.body);
        res.status(200).json(result);
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await promoService.get(req.params.id);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await promoService.getAll();
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const pagination = async (req, res, next) => {
    try {
        const result =  await promoService.pagination(req.body);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const result = await promoService.search(req.body);
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