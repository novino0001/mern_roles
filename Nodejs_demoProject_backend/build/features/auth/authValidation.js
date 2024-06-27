"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constant_1 = require("../../constants/constant");
exports.signUpSchema = joi_1.default.object({
    fullName: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required().pattern(constant_1.EMAIL_REGEX),
    password: joi_1.default.string().min(8).required().pattern(constant_1.PASSWORD_REGEX),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().pattern(constant_1.EMAIL_REGEX),
    password: joi_1.default.string().min(6).required()
});
