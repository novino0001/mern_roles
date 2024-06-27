"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("./taskController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const taskRoutes = express_1.default.Router();
taskRoutes.post('/createTask', authMiddleware_1.authMiddleware, taskController_1.createTask);
taskRoutes.get('/getAllTask', authMiddleware_1.authMiddleware, taskController_1.getTasks);
taskRoutes.get('/getTaskById/:id', authMiddleware_1.authMiddleware, taskController_1.getTaskById);
taskRoutes.patch('/updateTaskById/:id', authMiddleware_1.authMiddleware, taskController_1.updateTask);
taskRoutes.delete('/deleteTask/:id', authMiddleware_1.authMiddleware, taskController_1.deleteTask);
taskRoutes.get('/upcoming-task', authMiddleware_1.authMiddleware, taskController_1.getUpcomingTask);
// Admin routes
taskRoutes.get('/admin/user/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), taskController_1.getUserTask);
taskRoutes.get('/admin/alluser-task', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), taskController_1.getAllUserTask);
taskRoutes.delete('/admin/delete-task/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), taskController_1.deleteUserTask);
taskRoutes.patch('/admin/update-task/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), taskController_1.updateUserTask);
taskRoutes.post('/createTaskByAdmin/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.roleMiddleware)('admin'), taskController_1.createTaskByAdmin);
exports.default = taskRoutes;
