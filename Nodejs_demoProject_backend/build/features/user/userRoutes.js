"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("./userControllers");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const userRoutes = express_1.default.Router();
userRoutes.get('/my-profile', authMiddleware_1.authMiddleware, userControllers_1.myProfile);
userRoutes.patch('/update-profile', authMiddleware_1.authMiddleware, userControllers_1.updateUserProfile);
// Admin routes
userRoutes.get('/admin/users', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), userControllers_1.getUsers);
userRoutes.get("/admin/latest-users", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), userControllers_1.getLatestUsers);
userRoutes.patch("/admin/block/:id", authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)("admin"), userControllers_1.blockUser);
exports.default = userRoutes;
