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
exports.signin = exports.signup = void 0;
const authService_1 = __importDefault(require("./authService"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, fullName } = req.body;
    try {
        const user = yield authService_1.default.register(email, password, fullName);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json("somthing went wrong");
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield authService_1.default.login(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json("somthing went wrong");
    }
});
exports.signin = signin;
