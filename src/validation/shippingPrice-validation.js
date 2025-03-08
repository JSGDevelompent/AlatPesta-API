import Joi from "joi";

const createValidation = Joi.object({
    type: Joi.string().valid('FixedPrice','PriceDistance').required(),
    price: Joi.number().positive().min(1).integer().required(),
    distance: Joi.number().positive().required()
});

const updateValidation = Joi.object({
    type: Joi.string().valid('FixedPrice','PriceDistance').optional(),
    price: Joi.number().positive().min(1).integer().optional(),
    distance: Joi.number().positive().optional()
});

export {
    createValidation,
    updateValidation
}