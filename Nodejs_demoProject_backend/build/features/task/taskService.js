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
const taskModel_1 = __importDefault(require("../../models/taskModel"));
const commonInterfaces_1 = require("../../interfaces/commonInterfaces");
const mongoose_1 = __importDefault(require("mongoose"));
class TaskService {
    createTask(userTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = new taskModel_1.default(userTask);
                yield task.save();
                if (task._id) {
                    const taskInfo = {
                        title: task.title,
                        description: task.description,
                        dewDate: task.dueDate,
                        status: task.status
                    };
                    commonInterfaces_1.response.data = taskInfo;
                    commonInterfaces_1.response.message = "Task created";
                    commonInterfaces_1.response.success = true;
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error creating task:", error);
                throw error;
            }
        });
    }
    ;
    getTasks(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield taskModel_1.default.aggregate([
                    {
                        $match: { userId: new mongoose_1.default.Types.ObjectId(user_id) }
                    },
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ]);
                const getscore = result.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, { pending: 0, completed: 0 });
                const allTask = yield taskModel_1.default.find({ userId: user_id });
                const response = {
                    data: {
                        allTask,
                        getscore
                    }
                };
                return response;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    ;
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getTask = yield taskModel_1.default.findById({ _id: id });
                if (getTask) {
                    commonInterfaces_1.response.message = "got task";
                    commonInterfaces_1.response.success = true,
                        commonInterfaces_1.response.data = { getTask };
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error to find task:", error);
                throw error;
            }
        });
    }
    updateTask(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    deleteTask(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    getUpcomingTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const oneWeekLater = new Date();
            oneWeekLater.setDate(now.getDate() + 7);
            try {
                const upcomingTasks = yield taskModel_1.default.find({
                    userId: id,
                    dueDate: {
                        $gte: now,
                        $lte: oneWeekLater
                    },
                    status: "pending"
                });
                console.log("------------------", upcomingTasks);
                if (upcomingTasks) {
                    commonInterfaces_1.response.data = { upcomingTasks };
                    return commonInterfaces_1.response;
                }
                else {
                    commonInterfaces_1.response.message = "No upcoming task";
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error find upcoming  task:", error);
                throw error;
            }
            ;
        });
    }
    // Admin service
    particularUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield taskModel_1.default.aggregate([
                    {
                        $match: { userId: new mongoose_1.default.Types.ObjectId(id) }
                    },
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ]);
                console.log("--------->", result);
                const getscore = result.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, { pending: 0, completed: 0 });
                console.log("________getscore______", getscore);
                const userTask = yield taskModel_1.default.find({ userId: id });
                const response = {
                    data: {
                        userTask,
                        getscore
                    }
                };
                return response;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    ;
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield taskModel_1.default.aggregate([
                    {
                        $lookup: {
                            from: 'users', // Name of the User collection
                            localField: 'userId', // Field in Task collection
                            foreignField: '_id', // Field in User collection
                            as: 'userDetails', // Output array field
                        },
                    },
                    {
                        $unwind: '$userDetails', // Unwind the userDetails array
                    },
                    {
                        $project: {
                            fullName: '$userDetails.fullName', // Select the fields you need
                            title: 1,
                            description: 1,
                            status: 1,
                            dueDate: 1,
                        },
                    },
                ]);
                const taskstatus = yield taskModel_1.default.aggregate([
                    {
                        $group: {
                            _id: "$status",
                            count: { $sum: 1 }
                        }
                    }
                ]);
                const getscore = taskstatus.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, { pending: 0, completed: 0 });
                if (results) {
                    commonInterfaces_1.response.data = { results, getscore };
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    ;
    adminDeleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted_task = yield taskModel_1.default.findOneAndDelete({ _id: id });
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
    }
    ;
    adminUpdateTask(id, title, description, dewDate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = {
                    title: title,
                    description: description,
                    dewDate: dewDate,
                    status: status
                };
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
    }
    createTaskByAdmin(userTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = new taskModel_1.default(userTask);
                yield task.save();
                if (task._id) {
                    const taskInfo = {
                        title: task.title,
                        description: task.description,
                        dewDate: task.dueDate,
                        status: task.status
                    };
                    commonInterfaces_1.response.data = taskInfo;
                    commonInterfaces_1.response.message = "Task created";
                    commonInterfaces_1.response.success = true;
                    return commonInterfaces_1.response;
                }
            }
            catch (error) {
                console.error("Error creating task:", error);
                throw error;
            }
        });
    }
    ;
}
exports.default = new TaskService();
