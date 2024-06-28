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
exports.blockUser = exports.getLatestUsers = exports.getAllUsers = exports.updateUserProfile = exports.myProfile = void 0;
const userServices_1 = __importDefault(require("./userServices"));
//my-profile
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const userData = yield userServices_1.default.getUserData(user);
        res.status(200).json(userData);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.myProfile = myProfile;
// Update user profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const updates = req.body;
        const updated_user = yield userServices_1.default.updateUserProfile(user, updates);
        if (!updated_user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updated_user);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.updateUserProfile = updateUserProfile;
// Get all users (Admin only)
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices_1.default.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getAllUsers = getAllUsers;
const getLatestUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userServices_1.default.getLatestUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.getLatestUsers = getLatestUsers;
const blockUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const blocked_user = yield userServices_1.default.blockUser(id);
        if (!blocked_user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(blocked_user);
    }
    catch (error) {
        res.status(400).json("something went wrong");
    }
});
exports.blockUser = blockUser;
