import Joi from "joi";

const updateCompanyValidation = Joi.object({
    name: Joi.string().max(255).optional(),
    icon: Joi.string().max(255).optional(),
    aboutUs: Joi.string().max(65535).optional(),
    termsAndConditions: Joi.string().max(65535).optional(),
    linkGMap: Joi.string().max(65535).optional(),
    phoneNumber: Joi.string().max(65535).optional(),
    email: Joi.string().max(65535).optional(),
    facebook: Joi.string().max(65535).optional(),
    twitter: Joi.string().max(65535).optional(),
    instagram: Joi.string().max(65535).optional(),
    linkedIn: Joi.string().max(65535).optional(),
    youtube: Joi.string().max(65535).optional(),
    shopee: Joi.string().max(65535).optional(),
    lazada: Joi.string().max(65535).optional(),
    tokoPedia: Joi.string().max(65535).optional(),
}).unknown(true);

const createCompanyValidation = Joi.object({
    name: Joi.string().max(255).required(),
    icon: Joi.string().max(255).optional(),
    aboutUs: Joi.string().max(65535).optional(),
    termsAndConditions: Joi.string().max(65535).optional(),
    linkGMap: Joi.string().max(65535).optional(),
    phoneNumber: Joi.string().max(65535).optional(),
    email: Joi.string().max(65535).optional(),
    facebook: Joi.string().max(65535).optional(),
    twitter: Joi.string().max(65535).optional(),
    instagram: Joi.string().max(65535).optional(),
    linkedIn: Joi.string().max(65535).optional(),
    youtube: Joi.string().max(65535).optional(),
    shopee: Joi.string().max(65535).optional(),
    lazada: Joi.string().max(65535).optional(),
    tokoPedia: Joi.string().max(65535).optional(),
}).unknown(true);

export {
    updateCompanyValidation,
    createCompanyValidation
}