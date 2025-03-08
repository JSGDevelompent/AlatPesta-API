import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { uploadSingleImageMiddleware, uploadSubToolsImagesMiddleware } from "../middleware/multer-middleware.js";
import { singleImageUploadHandler, uploadWatermark, multipleImagesUploadHandler } from "../middleware/cloudinary-middleware.js";
import adminController from "../controller/admin-controller.js";
import companyController from "../controller/company-controller.js";
import toolsController from "../controller/tools-controller.js";
import newsController from "../controller/news-controller.js";
import promoController from "../controller/promo-controller.js";
import QandAController from "../controller/QandA-controller.js";
import typeController from "../controller/type-controller.js";
import colorToolsController from "../controller/colorTools-controller.js";
import modelController from "../controller/model-controller.js";
import shippingController from "../controller/shipping-controller.js";
import subToolsController from "../controller/subTools-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
//Admin //Test Selesai
userRouter.get('/admin/checkAuth' , adminController.checkAuth)
userRouter.patch('/admin/update/password', adminController.updatePassword);
userRouter.patch('/admin/update/username', adminController.updateUsername);
//Company //Test Selesai
userRouter.post('/admin/company/create', uploadSingleImageMiddleware, uploadWatermark, companyController.create);
userRouter.patch('/admin/company/update', uploadSingleImageMiddleware, uploadWatermark, companyController.update);
//Model //Test Selesai
userRouter.post('/admin/model/create', modelController.createModel);
userRouter.patch('/admin/model/update/:id', modelController.updateModel);
userRouter.delete('/admin/model/delete/:id', modelController.deleteModel);
userRouter.delete('/admin/model/delete', modelController.deleteManyModel);
userRouter.get('/admin/model/pagination', modelController.paginationModel);
userRouter.get('/admin/model/search', modelController.searchModel);
//Type //Test Selesai
userRouter.post('/admin/type/create', typeController.createType);
userRouter.patch('/admin/type/update/:id', typeController.updateType);
userRouter.delete('/admin/type/delete/:id', typeController.deleteType);
userRouter.delete('/admin/type/delete', typeController.deleteManyType);
userRouter.get('/admin/type/pagination', typeController.paginationType);
userRouter.get('/admin/type/search', typeController.searchType);
//Color //Test 1 Selesai
userRouter.post('/admin/tool/color/create', colorToolsController.createColor);
userRouter.patch('/admin/tool/color/update', colorToolsController.updateColor);
userRouter.delete('/admin/tool/color/delete/:id', colorToolsController.deleteColor);
userRouter.delete('/admin/tool/color/delete', colorToolsController.deleteManyColor);
userRouter.get('/admin/tool/color/pagination', colorToolsController.paginationColor);
userRouter.get('/admin/tool/color/search', colorToolsController.searchColor);
// Tools //Test Selesai 
userRouter.post('/admin/tool/create', uploadSingleImageMiddleware, singleImageUploadHandler, toolsController.createTools);
userRouter.patch('/admin/tool/update', uploadSingleImageMiddleware, singleImageUploadHandler,  toolsController.updateTools);
userRouter.delete('/admin/tool/delete/:id', toolsController.deleteTools);
userRouter.delete('/admin/tool/delete', toolsController.deleteManyTools);
userRouter.get('/admin/tool/pagination', toolsController.paginationTools);
userRouter.get('/admin/tool/search', toolsController.searchTools);
// Sub Tools //Test Selesai
userRouter.post('/admin/tool/sub/create', uploadSubToolsImagesMiddleware, multipleImagesUploadHandler, subToolsController.create);
userRouter.patch('/admin/tool/sub/update', uploadSubToolsImagesMiddleware, multipleImagesUploadHandler, subToolsController.update);
userRouter.delete('/admin/tool/sub/delete/:id', subToolsController.remove);
userRouter.delete('/admin/tool/sub/delete', subToolsController.removeMany);
userRouter.delete('/admin/tool/sub/sti/delete/:id', subToolsController.removeSTI);
userRouter.delete('/admin/tool/sub/sti/delete', subToolsController.removeManySTI);
userRouter.get('/admin/tool/sub/pagination', subToolsController.pagination);
userRouter.get('/admin/tool/sub/search', subToolsController.search);
// News //Test Selesai
userRouter.post('/admin/news/create', uploadSingleImageMiddleware, singleImageUploadHandler , newsController.create);
userRouter.patch('/admin/news/update/:id', uploadSingleImageMiddleware, singleImageUploadHandler , newsController.update);
userRouter.delete('/admin/news/delete/:id', newsController.remove);
userRouter.delete('/admin/news/delete', newsController.removeMany);
userRouter.get('/admin/news/pagination', newsController.pagination);
userRouter.get('/admin/news/search', newsController.search);
// Promo //Test Selesai
userRouter.post('/admin/promo/create', uploadSingleImageMiddleware, singleImageUploadHandler , promoController.create);
userRouter.patch('/admin/promo/update/:id', uploadSingleImageMiddleware, singleImageUploadHandler , promoController.update);
userRouter.delete('/admin/promo/delete/:id', promoController.remove);
userRouter.delete('/admin/promo/delete', promoController.removeMany);
userRouter.get('/admin/promo/pagination', promoController.pagination);
userRouter.get('/admin/promo/search', promoController.search);
userRouter.get('/admin/promo/:id', promoController.get);
userRouter.get('/admin/promo', promoController.getAll);
//QandA // Test Selesai
userRouter.post('/admin/qanda/create', QandAController.create);
userRouter.patch('/admin/qanda/update/:id', QandAController.update);
userRouter.delete('/admin/qanda/delete/:id', QandAController.remove);
userRouter.delete('/admin/qanda/delete', QandAController.removeMany);
userRouter.get('/admin/qanda/pagination', QandAController.pagination);
userRouter.get('/admin/qanda/search', QandAController.search);
//Shipping // Test Selesai
userRouter.post('/admin/shipping/create', shippingController.create);
userRouter.patch('/admin/shipping/update', shippingController.update);
userRouter.get('/admin/shipping', shippingController.get);
export {
	userRouter
}
