import Joi from "joi";

const createToolsValidation = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    image: Joi.string().max(65535).min(1).optional(),
    description: Joi.string().max(65535).min(1).optional(),
    price: Joi.number().integer().min(1).positive().required(),
    modelName: Joi.string().max(100).min(1).required(),
    colorName: Joi.string().max(100).min(1).optional(),
    typeName: Joi.string().max(100).min(1).required()
});

const updateToolsValidation = Joi.object({
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().min(1).max(255).optional(),
    image: Joi.string().max(65535).min(1).optional(),
    description: Joi.string().max(65535).min(1).optional(),
    price: Joi.number().integer().min(1).positive().optional(),
    modelName: Joi.string().max(100).min(1).optional(),
    colorName: Joi.string().max(100).min(1).optional(),
    typeName: Joi.string().max(100).min(1).optional()
});

const deleteToolsValidation = Joi.number().integer().min(1).required();

const deleteToolsSelectionValidation = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer())
        .min(1)
        .required()
});

const getToolsValidation = Joi.number().integer().min(1).required();

const paginationToolsValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name', 'price', 'modelTools', 'typeTools', 'subTools').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const searchToolsValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name', 'price', 'modelTools', 'typeTools', 'subTools').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export {
    createToolsValidation,
    updateToolsValidation,
    deleteToolsSelectionValidation,
    deleteToolsValidation,
    getToolsValidation,
    paginationToolsValidation,
    searchToolsValidation,
    
}