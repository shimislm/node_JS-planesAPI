const Joi = require("joi")

exports.validatePlane = (_reqBody) =>{
    let year = new Date().getFullYear()
    let schemaJoi = Joi.object({
        name: Joi.string().min(2).max(25).required(),
        manufacturer: Joi.string().min(2).max(50).required(),
        info: Joi.string().min(5).max(1000).required(),
        year: Joi.number().min(1903).max(year).required(),
        category: Joi.string().min(1).max(50).required(),
        img_url: Joi.string().allow(null, "").max(500)
    })
    return schemaJoi.validate(_reqBody);
}