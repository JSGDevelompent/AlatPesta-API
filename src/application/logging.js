import winston from "winston";
import fs from "fs";
import path from "path";

// Path untuk file log
const logFilePath = path.join("logs", "app.log");

// Hapus file log jika ada (agar log tidak ditambah tapi ditimpa setiap kali aplikasi dijalankan)
if (fs.existsSync(logFilePath)) {
    fs.unlinkSync(logFilePath);
}

// Buat logger baru
export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // new winston.transports.Console({}),
        new winston.transports.File({
            filename: logFilePath,
            level: "info",
        })
    ]
});
