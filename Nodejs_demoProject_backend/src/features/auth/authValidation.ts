import Joi from 'joi';
import { EMAIL_REGEX , PASSWORD_REGEX } from "../../constants/constant"
 


export const signUpSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required().pattern(EMAIL_REGEX),
  password: Joi.string().min(8).required().pattern(PASSWORD_REGEX),
  
 
 
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().pattern(EMAIL_REGEX),
    password: Joi.string().min(6).required()
  });