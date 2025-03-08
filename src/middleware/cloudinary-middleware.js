import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { ResponseError } from '../error/response-error.js';
import { deleteOldImage } from './delete-image-middleware.js';
import dotenv from 'dotenv';
import { logger } from '../application/logging.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadWatermark = async (req, res, next) => {
    try {
        if (!req.file) return next();
        const filePatch = path.join('public', path.basename(req.file.filename));
        const result = await cloudinary.uploader.upload( filePatch, {
            folder: "watermarks", 
            resource_type: "image",
        });
        deleteOldImage(req.file.path)
        logger.info(result);
        req.cloudinary = result;
        next();
    } catch (error) {
        console.error("Watermark upload failed:", error);
        next(error);
    }
};

export const singleImageUploadHandler = async (req, res, next) => {
    try {
        if (!req.file) return next();
        const filePatch = path.join('public', path.basename(req.file.filename));
        const result = await cloudinary.uploader.upload(filePatch, {
            folder: "upload", 
            resource_type: "image",
        }); 
        deleteOldImage(req.file.path)
        req.cloudinary = result;
        next();
    } catch (error) {
        next(error);
    }
};

export const multipleImagesUploadHandler = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next();
        }

        const uploadPromises = [];

        for (const field in req.files) {
            const files = req.files[field];  
            files.forEach(file => {
                uploadPromises.push(
                    cloudinary.uploader.upload(file.path, {
                        folder: "upload",
                        resource_type: "image",
                        public_id: file.filename 
                    })
                );
            });
        }

        const cloudinaryResults = await Promise.all(uploadPromises);

        req.cloudinary = cloudinaryResults;

        for (const field in req.files) {
            if (Object.prototype.hasOwnProperty.call(req.files, field)) { // Ganti hasOwnProperty
                const filesArray = req.files[field];
                
                for (const file of filesArray) {
                    await deleteOldImage(file.filename);
                }
            }
        }

        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const deleteCloudinaryFile = async (url) => {
    try {
        // Menggunakan regex untuk mendapatkan publicId
        const regex = /\/upload\/v\d+\/([^/]+\/[^/]+)(?=\.\w+$)/;
        const match = url.match(regex);

        if (match && match[1]) {
            const publicId = match[1]; // Public ID adalah bagian setelah '/upload/'
            console.log(publicId);

            try {
                // Mencoba untuk menghapus file dari Cloudinary
                const result = await cloudinary.uploader.destroy(publicId);
                
                // Cek apakah penghapusan berhasil
                if (result.result !== 'ok') {
                    // Jika gagal, log error tapi lanjutkan proses
                    console.error(`Failed to delete file: ${publicId}`);
                } else {
                    console.log(`File deleted successfully: ${publicId}`);
                }
                
                return result;
            } catch (error) {
                // Menangani error penghapusan dan tetap lanjut
                console.error(`Error during Cloudinary file deletion: ${error.message}`);
            }
        } else {
            console.error('Public ID not found in the URL');
        }
    } catch (error) {
        // Menangani error lainnya seperti format URL yang salah
        console.error(`Cloudinary deletion failed: ${error.message}`);
    }
};