"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_json_1 = __importDefault(require("../../env.json"));
const envConfig = () => {
    const nodeEnv = process.env.NODE_ENV || "local";
    return env_json_1.default[nodeEnv];
};
exports.default = envConfig;
