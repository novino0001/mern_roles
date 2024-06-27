"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const authValidation_1 = require("./authValidation");
const schemaValidations_1 = require("../../middlewares/schemaValidations");
const authRoutes = express_1.default.Router();
authRoutes.post('/signup', (0, schemaValidations_1.validateRequest)(authValidation_1.signUpSchema), authController_1.signup);
authRoutes.post('/signin', (0, schemaValidations_1.validateRequest)(authValidation_1.loginSchema), authController_1.signin);
exports.default = authRoutes;
