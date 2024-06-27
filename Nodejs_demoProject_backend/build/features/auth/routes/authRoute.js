"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const loginValidation_1 = require("../middlewares/loginValidation");
const registerValidation_1 = require("../middlewares/registerValidation");
const commonMiddlewares_1 = require("../../../middlewares/commonMiddlewares");
const authRoutes = express_1.default.Router();
authRoutes.post('/signup', (0, commonMiddlewares_1.validateRequest)(registerValidation_1.signUpSchema), authController_1.signup);
authRoutes.post('/signin', (0, commonMiddlewares_1.validateRequest)(loginValidation_1.loginSchema), authController_1.signin);
exports.default = authRoutes;
