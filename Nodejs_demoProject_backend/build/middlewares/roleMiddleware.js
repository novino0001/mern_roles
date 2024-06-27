"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const roleMiddleware = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.body;
        const user = yield userModel_1.default.findOne({ _id: userId });
        if ((user === null || user === void 0 ? void 0 : user.role) !== role) {
            return res.status(403).send({ error: 'Access denied' });
        }
        next();
    });
};
exports.roleMiddleware = roleMiddleware;
