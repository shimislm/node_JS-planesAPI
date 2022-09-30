const Joi = require("joi")

exports.validateUser = (bodyData) => {
    let joiSchema = Joi.object({
        fullName: {
            firstName: Joi.string().required().min(2).max(20),
            lastName: Joi.string().required().min(2).max(20)
        },
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3).max(20),
    })

    return joiSchema.validate(bodyData)
}
exports.validateLoginUser = (bodyData) => {
    let joiSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(3).max(20)
    })

    return joiSchema.validate(bodyData)
}