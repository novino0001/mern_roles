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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../../../models/userModel"));
const envConfig_1 = __importDefault(require("../../../config/envConfig"));
const commonInterfaces_1 = require("../../../interfaces/commonInterfaces");
const { secretKey } = (0, envConfig_1.default)();
class AuthService {
    register(email, password, fullName) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield userModel_1.default.findOne({ email });
            if (userExists) {
                commonInterfaces_1.response.message = "User already exists";
                commonInterfaces_1.response.success = false;
                return commonInterfaces_1.response;
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 8);
            const newUser = new userModel_1.default({ email, password: hashedPassword, fullName });
            yield newUser.save();
            commonInterfaces_1.response.message = "User created successfully";
            commonInterfaces_1.response.success = true;
            return commonInterfaces_1.response;
        });
    }
    ;
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                commonInterfaces_1.response.message = "Invalid email";
                commonInterfaces_1.response.success = false;
                return commonInterfaces_1.response;
            }
            const id = user._id;
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                commonInterfaces_1.response.message = "Invalid Password";
                commonInterfaces_1.response.success = false;
                return commonInterfaces_1.response;
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: "1h" });
            commonInterfaces_1.response.message = "Login successful";
            commonInterfaces_1.response.success = true;
            // response.data = { token };
            commonInterfaces_1.response.data = { token, user };
            return commonInterfaces_1.response;
        });
    }
}
exports.default = new AuthService();
