import Joi from "joi";

const createTypeToolsValidation = Joi.object({
    name: Joi.string().max(255).min(1).required()
});

const updateTypeToolsValidation = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
    name: Joi.string().max(255).min(1).required()
});

const deleteTypeToolsValidation = Joi.number().integer().positive().min(1).required();

const deleteTypeToolsSelectionValidation = Joi.object({
    ids: Joi.array().items(Joi.number().integer().positive().min(1)).min(1).required()
});
const getTypeToolsValidation = Joi.number().integer().min(1).required();

const searchTypeToolsValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const paginationTypeToolsValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export {
    createTypeToolsValidation,
    updateTypeToolsValidation,
    deleteTypeToolsSelectionValidation,
    deleteTypeToolsValidation,
    getTypeToolsValidation,
    paginationTypeToolsValidation,
    searchTypeToolsValidation,
}
