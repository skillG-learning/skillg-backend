const Joi = require("joi");

const blogValidationSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    content: Joi.string().allow(null, ""), // Allow optional content field
    images: Joi.array().items(Joi.string()).min(1).required(), // Array of strings, at least one element required
});

module.exports = {
    blogValidationSchema,
};