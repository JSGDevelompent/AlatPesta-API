import Joi from "joi";

const createValidation = Joi.object({
    title: Joi.string().max(255).required(),
    question: Joi.string().max(65535).required(),
    answer: Joi.string().max(65535).required(),
});

const updateValidation = Joi.object({
    id: Joi.number().integer().min(1).required(),
    title: Joi.string().max(255).optional(),
    question: Joi.string().max(65535).optional(),
    answer: Joi.string().max(65535).optional(),
});

const deleteValidation = Joi.number().positive().min(1).required();

const deleteSelectionValidation = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer())
        .min(1)
        .required()
});

const getValidation = Joi.number().positive().min(1).required();

const paginationValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    dataRequest: Joi.number().integer().min(1).default(5),
    sortBy: Joi.string().valid('updateAt', 'title', 'question', 'answer').default('updateAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

const searchValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1),
    dataRequest: Joi.number().integer().min(1).default(5),
    sortBy: Joi.string().valid('updateAt', 'title', 'question', 'answer').default('updateAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

export {
    createValidation,
    updateValidation,
    getValidation,
    deleteValidation,
    deleteSelectionValidation,
    paginationValidation,
    searchValidation
}
