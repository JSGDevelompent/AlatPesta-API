import companyService from "../service/conpany-service.js";
import { deleteOldImage } from "../middleware/delete-image-middleware.js";
import { deleteCloudinaryFile } from "../middleware/cloudinary-middleware.js";


const create = async (req, res, next) => {
    try {
        const result = await companyService.createCompany(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        if (req.cloudinary) deleteCloudinaryFile(req.cloudinary.public_id);
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await companyService.updateCompany(req);
        res.status(200).json({
            data: result,
            message: "update company data successfully"
        });
    } catch (e) {
        if (req.file) deleteOldImage(req.file.filename);
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await companyService.get();
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
    get
}