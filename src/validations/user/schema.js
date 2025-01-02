const Joi = require("joi");

const joiValidationSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "any.required": "Name is required.",
            "string.base": "Name must be a string.",
        }),
    email: Joi.string(),
    phone: Joi.string()
        .required()
        .pattern(/^[0-9]+$/)
        .messages({
            "any.required": "Phone number is required.",
            "string.base": "Phone number must be a string.",
            "string.pattern.base": "Phone number must contain only digits.",
        }),
    age: Joi.number()
        .required()
        .integer()
        .positive()
        .messages({
            "any.required": "Age is required.",
            "number.base": "Age must be a number.",
            "number.integer": "Age must be an integer.",
            "number.positive": "Age must be a positive number.",
        }),
    grade: Joi.number()
        .required()
        .positive()
        .messages({
            "any.required": "Grade is required.",
            "number.base": "Grade must be a number.",
            "number.positive": "Grade must be a positive number.",
        }),
    status: Joi.string()
        .valid("active", "disable")
        .default("active")
        .required()
        .messages({
            "any.required": "Status is required.",
            "string.base": "Status must be a string.",
            "any.only": "Status must be either 'active' or 'disable'.",
        }),
});

module.exports = {joiValidationSchema};
