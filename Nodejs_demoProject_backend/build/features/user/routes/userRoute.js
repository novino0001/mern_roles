"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const authMiddleware_1 = require("../../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../../middlewares/roleMiddleware");
const authRoute_1 = __importDefault(require("../../auth/routes/authRoute"));
const userRouter = express_1.default.Router();
userRouter.put('/profile', authMiddleware_1.authMiddleware, usercontroller_1.updateUserProfile);
// Admin routes
userRouter.get('/admin/users', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), usercontroller_1.getAllUsers);
exports.default = authRoute_1.default;
// import express from 'express';
// import { updateUserProfile, getAllUsers } from '../controllers/userController';
// import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';
// const router = express.Router();
// // Update user profile
// router.put('/profile', authenticate, updateUserProfile);
// // Get all users (Admin only)
// router.get('/', authenticate, authorizeAdmin, getAllUsers);
// export default router;
