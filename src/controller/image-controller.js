import { ResponseError } from "../error/response-error.js";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PublicImage = async (req, res, next) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../../public', filename);

        await fs.access(filePath);

        res.status(200).sendFile(filePath);
    } catch (e) {
        next(new ResponseError(404, "Image not found"));
    }
}

export default {
    PublicImage
}