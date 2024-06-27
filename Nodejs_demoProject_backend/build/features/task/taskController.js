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
exports.createTaskByAdmin = exports.updateUserTask = exports.deleteUserTask = exports.getAllUserTask = exports.getUserTask = exports.getUpcomingTask = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const taskService_1 = __importDefault(require("./taskService"));
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield taskService_1.default.createTask(req.body);
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
        const tasks = yield taskService_1.default.getTasks(userId);
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
        const task = yield taskService_1.default.getTaskById(id);
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
        const task = yield taskService_1.default.updateTask(id, updates);
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
        const task = yield taskService_1.default.deleteTask(id, userId);
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
const getUpcomingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const tasks = yield taskService_1.default.getUpcomingTask(userId);
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getUpcomingTask = getUpcomingTask;
//Admin
const getUserTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tasks = yield taskService_1.default.particularUser(id);
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
        const tasks = yield taskService_1.default.getAllTasks();
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
        const task = yield taskService_1.default.adminDeleteTask(id);
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
        const task = yield taskService_1.default.adminUpdateTask(id, title, description, dewDate, status);
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
        const task = yield taskService_1.default.createTaskByAdmin(req.body);
        res.status(201).json(task);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.createTaskByAdmin = createTaskByAdmin;
