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
exports.adminUpdateTask = exports.adminDeleteTask = exports.getAllTasks = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const taskModel_1 = __importDefault(require("../../../models/taskModel"));
const commonInterfaces_1 = require("../../../interfaces/commonInterfaces");
const createTask = (taskData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = new taskModel_1.default(taskData);
        yield task.save();
        if (task) {
            commonInterfaces_1.response.message = " successfully created",
                commonInterfaces_1.response.success = true;
        }
        return task;
    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error; // Re-throw the error after logging it
    }
});
exports.createTask = createTask;
const getTasks = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield taskModel_1.default.find({ userId: user_id });
});
exports.getTasks = getTasks;
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("---------------", id);
    return yield taskModel_1.default.find({ _id: id });
});
exports.getTaskById = getTaskById;
const updateTask = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated_task = yield taskModel_1.default.findOneAndUpdate({ _id: id }, updates, { new: true });
        if (updated_task) {
            commonInterfaces_1.response.message = "task successfully updated";
            commonInterfaces_1.response.success = true,
                commonInterfaces_1.response.data = { updated_task };
            return commonInterfaces_1.response;
        }
    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    }
});
exports.updateTask = updateTask;
const deleteTask = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted_task = yield taskModel_1.default.findOneAndDelete({ _id: id, userId });
        if (deleted_task) {
            commonInterfaces_1.response.message = "task successfully deleted";
            commonInterfaces_1.response.success = true,
                commonInterfaces_1.response.data = { deleted_task };
            return commonInterfaces_1.response;
        }
    }
    catch (error) {
        console.error("Error delete task:", error);
        throw error;
    }
    ;
});
exports.deleteTask = deleteTask;
// Admin services
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield taskModel_1.default.find();
});
exports.getAllTasks = getAllTasks;
const adminDeleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield taskModel_1.default.findByIdAndDelete(id);
});
exports.adminDeleteTask = adminDeleteTask;
const adminUpdateTask = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return yield taskModel_1.default.findByIdAndUpdate(id, updates, { new: true });
});
exports.adminUpdateTask = adminUpdateTask;
