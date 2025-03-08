import express from "express";
import healthController from "../controller/health-controller.js";
import adminController from "../controller/admin-controller.js";
import companyController from "../controller/company-controller.js";
import imageController from "../controller/image-controller.js";
import toolsController from "../controller/tools-controller.js";
import modelController from "../controller/model-controller.js";
import typeController from "../controller/type-controller.js";
import colorToolsController from "../controller/colorTools-controller.js";
import subToolsController from "../controller/subTools-controller.js";
import rateLimit from "express-rate-limit";
import promoController from "../controller/promo-controller.js";
import QandAController from "../controller/QandA-controller.js";
import shippingController from "../controller/shipping-controller.js";
import newsController from "../controller/news-controller.js";
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80000,
    message: "Too many login attempts, please try again later."
});

const publicRouter = new express.Router();
publicRouter.post('/register', adminController.register);
publicRouter.post('/login', loginLimiter, adminController.login);
publicRouter.get ('/admin/check', adminController.checkAdmin)

publicRouter.get('/ping', healthController.ping);
publicRouter.get('/company', companyController.get);
publicRouter.get('/image/:filename', imageController.PublicImage);
publicRouter.get('/tools', toolsController.getAllTools);
publicRouter.get('/subtools', subToolsController.getAll);
publicRouter.get('/model', modelController.getAllModel);
publicRouter.get('/news', newsController.getAll);
publicRouter.get('/type', typeController.getAllType);
publicRouter.get('/colors', colorToolsController.getAllColor);
publicRouter.get('/shipping', shippingController.get);
publicRouter.get('/promo', promoController.getAll);
publicRouter.get('/qanda', QandAController.getAll);

export {
    publicRouter
}
