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
const userModel_1 = __importDefault(require("../../models/userModel"));
const commonInterfaces_1 = require("../../interfaces/commonInterfaces");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    getUserData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findById({ _id: id }).select('-password');
            ;
            if (!user) {
                commonInterfaces_1.response.message = "User not found";
                commonInterfaces_1.response.success = false;
                return commonInterfaces_1.response;
            }
            const userInfo = {
                fullName: user.fullName,
                email: user.email
            };
            commonInterfaces_1.response.data = userInfo;
            commonInterfaces_1.response.message = "User found";
            commonInterfaces_1.response.success = true;
            return commonInterfaces_1.response;
        });
    }
    updateUserProfile(userId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updates.password) {
                const hashedPassword = yield bcryptjs_1.default.hash(updates.password, 10);
                updates.password = hashedPassword;
            }
            const updated_user = yield userModel_1.default.findByIdAndUpdate(userId, updates, { new: true });
            if (!updated_user) {
                return {
                    message: "User not found",
                    success: false,
                };
            }
            return {
                message: "User updated successfully",
                data: updated_user,
                success: true,
            };
        });
    }
    ;
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all_users = yield userModel_1.default.find({ role: "user" });
                if (all_users) {
                    commonInterfaces_1.response.data = { all_users };
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error to find task:", error);
                throw error;
            }
        });
    }
    getLatestUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recent_users = yield userModel_1.default.find({ role: "user" })
                    .sort({ createdAt: -1 }) // Sort by creation date in descending order
                    .limit(3);
                if (recent_users) {
                    commonInterfaces_1.response.data = { recent_users };
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error to find task:", error);
                throw error;
            }
        });
    }
}
exports.default = new UserService();
