const Joi = require('joi');

// Define the Joi validation schema
const courseValidationSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
    detail: Joi.string().required(),
    images: Joi.array().items(Joi.string()).optional(),
});

module.exports = {courseValidationSchema}