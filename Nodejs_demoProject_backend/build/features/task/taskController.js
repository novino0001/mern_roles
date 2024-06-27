"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskByAdmin = exports.updateUserTask = exports.deleteUserTask = exports.getAllUserTask = exports.getUserTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const taskService = __importStar(require("./taskService"));
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskService.createTask(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.createTask = createTask;
// Get all tasks for the authenticated user
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const tasks = yield taskService.getTasks(userId);
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.getTasks = getTasks;
// Get a specific task by ID for the authenticated user
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield taskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getTaskById = getTaskById;
// Update a specific task by ID for the authenticated user
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = yield taskService.updateTask(id, updates);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.updateTask = updateTask;
// Delete a specific task by ID for the authenticated user
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const task = yield taskService.deleteTask(id, userId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.deleteTask = deleteTask;
//Admin
const getUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasks = yield taskService.particularUser(id);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getUserTask = getUserTask;
// Admin function to get all tasks (for all users)
const getAllUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield taskService.getAllTasks();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getAllUserTask = getAllUserTask;
// Admin function to delete any user's task
const deleteUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield taskService.adminDeleteTask(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.deleteUserTask = deleteUserTask;
// Admin function to update any user's task
const updateUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, dewDate, status } = req.body;
    try {
        const task = yield taskService.adminUpdateTask(id, title, description, dewDate, status);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.updateUserTask = updateUserTask;
const createTaskByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        req.body.userId = id;
        const task = yield taskService.createTaskByAdmin(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.createTaskByAdmin = createTaskByAdmin;
