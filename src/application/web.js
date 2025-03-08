import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api.js";
import rateLimit from "express-rate-limit";
import cors from 'cors';
export const web = express();
// Konfigurasi rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 5 menit
    max: 100, // Maksimal 100 permintaan per IP dalam 15 menit
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests',
            message: 'You have reached the request limit. Please try again after a while.'
        });
    }
});
web.use(limiter);

const allowedOrigins = ['http://localhost:5173', 'http://192.168.1.180:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

web.use(express.json());
web.use(cors(corsOptions));

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
