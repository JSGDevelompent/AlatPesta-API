import Joi from "joi";

const createModelToolsValidation = Joi.object({
    name: Joi.string().max(255).min(1).required()
});

const updateModelToolsValidation = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    name: Joi.string().max(255).min(1).required()
});

const deleteModelToolsValidation = Joi.number().integer().positive().min(1).required();

const deleteModelToolsSelectionValidation = Joi.object({
    ids: Joi.array().items(Joi.number().integer().positive().min(1)).min(1).required()
});

const searchModelToolsValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const paginationModelToolsValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const getModelToolsValidation = Joi.number().integer().min(1).required();

export {
    createModelToolsValidation,
    updateModelToolsValidation,
    deleteModelToolsSelectionValidation,
    deleteModelToolsValidation,
    getModelToolsValidation,
    paginationModelToolsValidation,
    searchModelToolsValidation,
}