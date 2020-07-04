//VALIDATION
const Joi = require('@hapi/joi');

//Register Validation
const newUserValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        gender: Joi.string().valid('male', 'female').required(),
        userName: Joi.string().min(3).required(),
        role: Joi.string().valid('user', 'seller','admin').required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(3).required()
    });
    return schema.validate(data);
};

const contactValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(5).required().email(),
        message: Joi.string().min(2).required(),
    });
    return schema.validate(data);
}

const newCompanyValidation = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().min(2).required(),
        companyEmail: Joi.string().min(5).required().email()
    });
    return schema.validate(data);
}
module.exports.newUserValidation = newUserValidation;
module.exports.newCompanyValidation = newCompanyValidation;
module.exports.loginValidation = loginValidation;
module.exports.contactValidation = contactValidation;