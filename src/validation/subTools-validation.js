import Joi from "joi";


const createValidation = Joi.object({
    name: Joi.string().max(255).required(),
    price: Joi.number().integer().positive().required(),
    toolName: Joi.string().required(),
    images: Joi.array().items(
        Joi.object({
            name: Joi.string().max(255).required(),
            image: Joi.string().uri().optional(), 
            colors: Joi.array().items(Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i)).required() 
        })
    ).single().required()
});

const updateValidation = Joi.object({
    id: Joi.number().integer().positive().required(),
    name: Joi.string().max(255),
    price: Joi.number().integer().positive(),
    toolName: Joi.string().optional(),
    images: Joi.array().items(
        Joi.object({
            id: Joi.number().integer().positive().optional(),
            name: Joi.string().max(255).optional(),
            image: Joi.string().uri().optional(),
            colors: Joi.array().items(
                Joi.string().pattern(/^#([0-9A-F]{3}){1,2}$/i)
            ).single().optional()
        })
    )
});


const deleteValidation = Joi.number().integer().min(1).required();

const deleteSelectionValidation = Joi.object({
    ids: Joi.array().items(Joi.number().integer().positive().min(1)).min(1).required()
});

const getValidation = Joi.number().integer().min(1).required();

const paginationValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name', 'price', 'STI').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

const searchValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1).optional(),
    dataRequest: Joi.number().integer().min(1).default(5).optional(),
    sortBy: Joi.string().valid('updateAt', 'name', 'price', 'STI').default('updateAt').optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc').optional()
});

export {
    createValidation,
    updateValidation,
    deleteSelectionValidation,
    deleteValidation,
    searchValidation,
    paginationValidation,
    getValidation
}