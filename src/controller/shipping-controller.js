import shippingService from "../service/shipping-service.js";

const create = async (req, res, next) => {
    try {
        const result = await shippingService.create(req);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await shippingService.update(req);
        res.status(200).json({
            data: result,
            message: "update shipping price data successfully"
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const result = await shippingService.get();
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