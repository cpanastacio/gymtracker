const Joi = require('joi');

const validationSchema = {};

validationSchema.register = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    birthday: Joi.date(),
    gender: Joi.string().min(4).max(6),
    height: Joi.number(),
    weight: Joi.number(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required(),
});

validationSchema.login = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});


module.exports = validationSchema;