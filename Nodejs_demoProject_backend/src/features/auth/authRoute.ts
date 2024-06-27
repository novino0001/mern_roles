import express from 'express';
import { signup, signin } from './authController';
import { loginSchema , signUpSchema } from './authValidation';
import { validateRequest } from "../../middlewares/schemaValidations"

const authRoutes = express.Router();

authRoutes.post('/signup', validateRequest(signUpSchema),signup );
authRoutes.post('/signin', validateRequest(loginSchema),signin );

 

export default authRoutes;

 

 

 
 


 