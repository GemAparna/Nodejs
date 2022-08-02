const Joi = require('joi');

const StudentDataValidation={
    createOrUpdateUser:{
        body:Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            phone:Joi.number().required(), 
            gender:Joi.string().required()
        })
    }
}
module.exports=StudentDataValidation;