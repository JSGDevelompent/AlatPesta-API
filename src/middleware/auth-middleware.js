import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const admin = await prismaClient.admin.findFirst({
            where: {
                token: token
            },
            select: {
                username: true,
                limitToken: true
            }
        });
        if (!admin || new Date() > admin.limitToken) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = admin.username;
            next();
        }
    }
}
