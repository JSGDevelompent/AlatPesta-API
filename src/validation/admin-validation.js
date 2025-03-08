import Joi from "joi";

const createAdminValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
});

const loginAdminValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
});

const updatePasswordAdminValidation = Joi.object({
    oldPassword: Joi.string().max(255).required(),
    newPassword: Joi.string().max(255).required()
});

const updateUsernameAdminValidation = Joi.object({
    username: Joi.string().max(255).required(),
    password: Joi.string().max(255).required()
});

export {
    createAdminValidation,
    loginAdminValidation,
    updateUsernameAdminValidation,
    updatePasswordAdminValidation
}