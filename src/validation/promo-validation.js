import Joi from "joi";

const createValidation = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(65535).optional(),
    image: Joi.string().max(65535).optional(),
    type: Joi.string().valid('Discount','FreeShipping','DayRentDiscount').required(),
    promoEndDate: Joi.date().iso().required(),
    discount: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
        minPrice: Joi.number().integer().min(0).optional(),
        discount: Joi.number().integer().min(0).required()
    }).optional(),
    dayRentDiscount: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        minPrice: Joi.number().integer().min(0).optional(),
        minDay: Joi.number().integer().min(0).positive().optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
        discount: Joi.number().integer().min(0).required()
    }).optional(),
    freeShipping: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
        minDay: Joi.number().integer().min(0).positive().optional(),
        minPrice: Joi.number().integer().min(0).positive().optional(),
        maxDistance: Joi.number().min(0).positive().optional(),
        discount: Joi.number().integer().min(0).required()
    }).optional()
});

const updateValidation = Joi.object({
    id: Joi.number().positive().min(1).required(),
    title: Joi.string().max(100).optional(),
    description: Joi.string().max(65535).optional(),
    type: Joi.string().valid('Discount','FreeShipping','DayRentDiscount').optional(),
    image: Joi.string().max(65535).optional(),
    promoEndDate: Joi.date().optional(),
    discount: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
        minPrice: Joi.number().integer().min(0).optional(),
        discount: Joi.number().integer().min(0).optional()
    }).optional(),
    dayRentDiscount: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        minPrice: Joi.number().integer().min(0).optional(),
        minDay: Joi.number().integer().min(0).positive().optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
        discount: Joi.number().integer().min(0).optional()
    }).optional(),
    freeShipping: Joi.object({
        maximumDiscount: Joi.number().integer().min(0).optional(),
        discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
        minPrice: Joi.number().integer().min(0).positive().optional(),
        minDay: Joi.number().integer().min(0).positive().optional(),
        maxDistance: Joi.number().min(0).positive().optional(),
        discount: Joi.number().integer().min(0).optional()
    }).optional()
});

const deleteValidation = Joi.number().integer().positive().min(1).required();

const deleteSelectionValidation = Joi.object({
    ids: Joi.array()
        .items(Joi.number().integer())
        .min(1)
        .required()
});

const getValidation = Joi.number().integer().positive().min(1).required();

const paginationValidation = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    dataRequest: Joi.number().integer().min(1).default(5),
    sortBy: Joi.string().valid('updateAt', 'description', 'title').default('updateAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

const searchValidation = Joi.object({
    search: Joi.string().max(100).min(1).required(),
    page: Joi.number().integer().min(1).default(1),
    dataRequest: Joi.number().integer().min(1).default(5),
    sortBy: Joi.string().valid('updateAt', 'description', 'title').default('updateAt'),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc')
});

const createDayRentDiscountValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    minPrice: Joi.number().integer().min(0).optional(),
    minDay: Joi.number().integer().min(0).positive().optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
    discount: Joi.number().integer().min(0).required()
});

const updateDayRentDiscountValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    minPrice: Joi.number().integer().min(0).optional(),
    minDay: Joi.number().integer().min(0).positive().optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
    discount: Joi.number().integer().min(0).optional()
});

const createDiscountValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
    minPrice: Joi.number().integer().min(0).optional(),
    discount: Joi.number().integer().min(0).required()
});

const updateDiscountValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
    minPrice: Joi.number().integer().min(0).optional(),
    discount: Joi.number().integer().min(0).optional()
});

const createFreeShippingValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").required(),
    minDay: Joi.number().integer().min(0).positive().optional(),
    minPrice: Joi.number().integer().min(0).positive().optional(),
    maxDistance: Joi.number().min(0).positive().optional(),
    discount: Joi.number().integer().min(0).required()
});

const updateFreeShippingValidation = Joi.object({
    maximumDiscount: Joi.number().integer().min(0).optional(),
    discountModel: Joi.string().valid("RateDiscount", "FixedAmount").optional(),
    minPrice: Joi.number().integer().min(0).positive().optional(),
    maxDistance: Joi.number().min(0).positive().optional()
});

export {
    createValidation,
    updateValidation,
    getValidation,
    deleteValidation,
    deleteSelectionValidation,
    paginationValidation,
    searchValidation,
    createDayRentDiscountValidation,
    createDiscountValidation,
    createFreeShippingValidation,
    updateDayRentDiscountValidation,
    updateDiscountValidation,
    updateFreeShippingValidation,
}