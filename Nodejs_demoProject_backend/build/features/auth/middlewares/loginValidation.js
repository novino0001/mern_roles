"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const constant_1 = require("../../../constants/constant");
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().pattern(constant_1.EMAIL_REGEX),
    password: joi_1.default.string().min(6).required()
});
