const Joi = require('joi');

const UserValidation={
    createOrUpdateUser:{
        body:Joi.object({
            username:Joi.string().required(),
            password:Joi.string().required(),
            phone:Joi.number().required(),
            email:Joi.string().required(),
            userType:Joi.string().required()
        })
    }
}
module.exports=UserValidation;