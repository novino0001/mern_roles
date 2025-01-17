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
            console.log("-----------updated=========", updated_user);
            if (!updated_user) {
                commonInterfaces_1.response.message = "User not found";
                commonInterfaces_1.response.success = false;
                return commonInterfaces_1.response;
            }
            else {
                console.log("-----------updated=========", updated_user._id);
                const updated_userinfo = {
                    userId: updated_user._id,
                    fullName: updated_user.fullName,
                    email: updated_user.email,
                    role: updated_user.role
                };
                return {
                    message: "User updated successfully",
                    data: updated_userinfo,
                    success: true,
                };
            }
        });
    }
    ;
    getAllUsers(page, limit, searchByEmail, searchByName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    $and: [
                        { fullName: { $regex: searchByName, $options: 'i' } },
                        { email: { $regex: searchByEmail, $options: 'i' } },
                        { role: { $ne: 'admin' } },
                    ],
                };
                const users = yield userModel_1.default.find(query)
                    .skip((page - 1) * limit)
                    .limit(limit);
                const totalUsers = yield userModel_1.default.countDocuments(query);
                return { users, totalUsers };
            }
            catch (error) {
                console.error("Error fetching users:", error);
                throw error;
            }
        });
    }
    getLatestUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recent_users = yield userModel_1.default.find({ role: "user" })
                    .sort({ _id: -1 }) // Sort by creation date in descending order
                    .limit(5);
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
    blockUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findById(userId);
                if (!user) {
                    return null;
                }
                user.isActive = !user.isActive;
                yield user.save();
                return {
                    message: user.fullName + (user.isActive ? " has been unblocked" : " has been blocked"),
                    success: true,
                    user,
                };
            }
            catch (error) {
                console.error("Error toggling block status:", error);
                throw error;
            }
        });
    }
}
exports.default = new UserService();
