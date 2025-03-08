import multer from 'multer';
import path from 'path';
import { ResponseError } from '../error/response-error.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        // Menggunakan nama asli file dengan menambahkan prefiks timestamp untuk menghindari duplikasi
        const timestamp = new Date().getTime();
        const originalName = path.parse(file.originalname).name;
        const fileExtension = path.extname(file.originalname);
        cb(null, `${timestamp}-${originalName}${fileExtension}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ResponseError(400, "Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: fileFilter
});


const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        const timestamp = new Date().getTime();
        const originalName = path.parse(file.originalname).name.replace(/\s+/g, '');
        console.log(req.body);
        console.log(req.files);
        if (!req.body || !req.body.images) {
            return cb(new Error("Data images not found"), null);
        }
        const indexMatch = file.fieldname.match(/\d+/);
        if (!indexMatch) {
            return cb(new Error("Fieldname does not contain index"), null);
        }
        const index = parseInt(indexMatch[0], 10);
        const imageId = req.body.images[index]?.id || originalName
        const fileExtension = path.extname(file.originalname);
        const imageName = req.body.images[index]?.name 
        ? req.body.images[index].name.replace(/\s+/g, '') 
        : `image_${imageId}`;
        cb(null, `${timestamp}-${imageName}-${imageId}${fileExtension}`);
    }
});

// Filter untuk jenis file yang diizinkan
const fileFilter1 = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ResponseError(400, "Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
};

// Konfigurasi multer
const upload1 = multer({
    storage: storage1,
    limits: { fileSize: 1024 * 1024 * 5 }, // Batas ukuran file 5MB
    fileFilter: fileFilter1
});

// Membuat array untuk field upload
const fieldsArray = Array.from({ length: 10 }, (_, i) => ({
    name: `images[${i}][image]`,
    maxCount: 1
}));

export const uploadSingleImageMiddleware = upload.single('image');

export const uploadSubToolsImagesMiddleware = upload1.fields(fieldsArray);
