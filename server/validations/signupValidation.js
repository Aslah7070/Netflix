
const Joi = require('joi');
const signUpSchema = Joi.object({
    
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().optional(),
  });

  module.exports=signUpSchema