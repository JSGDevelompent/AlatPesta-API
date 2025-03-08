import Joi from "joi";

const createColorToolsValidation = Joi.object({
    name: Joi.string().max(255).required(),
    options: Joi.number().integer().positive().min(1).required(),
    colors: Joi.array()
    .items(Joi.string()
    .pattern(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)).min(1).required()
});

const updateColorToolsValidation = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    options: Joi.number().integer().positive().min(1).optional(),
    name: Joi.string().max(255).optional(),
    colors: Joi.array()
    .items(Joi.string()
    .pattern(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i)).optional()
});

const deleteColorToolsValidation = Joi.number().integer().min(1).required();

const deleteColorToolsSelectionValidation = Joi.object({
    ids: Joi.array().items(Joi.number().integer().positive().min(1)).min(1).required()
});

const getColorToolsValidation = Joi.number().integer().min(1).required();

const paginationColorToolsValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name','options').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const searchColorToolsValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name','options').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export {
    createColorToolsValidation,
    updateColorToolsValidation,
    deleteColorToolsSelectionValidation,
    getColorToolsValidation,
    deleteColorToolsValidation,
    searchColorToolsValidation,
    paginationColorToolsValidation
}