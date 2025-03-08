import subToolsService from "../service/subTools-service.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";

const create = async (req, res, next) => {
    try {
        const result = await subToolsService.create(req);
        res.status(200).json({
            data: result,
            message: `Sub Tool ${result.name} added successfully`
        });
    } catch (e) {
        if (req.files) {
            if (Array.isArray(req.cloudinary)) {
                for (const file of req.cloudinary) {
                    await deleteCloudinaryFile(file.secure_url);
                }
            }
            
        }
        next(e);
    }
}

const update = async (req,res,next) => {
    try {
        const result = await subToolsService.update(req);
        res.status(200).json({
            data : result,
            message : `Upadate Sub Tool ${result.name} successfuly`
        });
    } catch (e) {
        if (req.files) {
            if (Array.isArray(req.cloudinary)) {
                for (const file of req.cloudinary) {
                    await deleteCloudinaryFile(file.secure_url);
                }
            }
            
        }
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const reslut = await subToolsService.get(req.body);
        res.status(200).json({
            data: reslut
        });
    } catch (e) {
        next(e);
    }
}

const getAll = async (req, res, next) => {
    try {
     const result = await subToolsService.getAll();
     res.status(200).json({
        data: result
     }) ;  
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const reslut = await subToolsService.remove(req.params.id);
        res.status(200).json({
            message: reslut
        });
    } catch (e) {
        next(e);
    }
}

const removeMany = async (req, res, next) => {
    try {
        const reslut = await subToolsService.removeMany(req.body);
        res.status(200).json({
            message : reslut
        });
    } catch (e) {
        next(e);
    }
}

const removeSTI = async (req, res, next) => {
    try {
        const reslut = await subToolsService.removeSTI(req.params.id);
        res.status(200).json({
            message : reslut
        });
    } catch (e) {
        next(e);
    }
}

const removeManySTI = async (req, res, next) => {
    try {
        const reslut = await subToolsService.removeManySTI(req.body);
        res.status(200).json({
            message : reslut
        });
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const reslut = await subToolsService.search(req.body);
        res.status(200).json(reslut);
    } catch (e) {
        next(e);
    }
}

const pagination = async (req, res, next) => {
    try {
        const reslut = await subToolsService.pagination(req.body);
        res.status(200).json(reslut);
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    remove,
    removeMany,
    removeManySTI,
    removeSTI,
    search,
    pagination,
    get,
    getAll
}