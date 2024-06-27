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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const database_1 = __importDefault(require("./config/database"));
const authRoute_1 = __importDefault(require("./features/auth/authRoute"));
const taskRoute_1 = __importDefault(require("./features/task/taskRoute"));
const userRoutes_1 = __importDefault(require("./features/user/userRoutes"));
const env = (0, envConfig_1.default)();
const port = env.port;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// console.log(port)
app.use('/api/v1/auth', authRoute_1.default);
app.use('/api/v1/task', taskRoute_1.default);
app.use('/api/v1/user', userRoutes_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.default)();
    console.log(`Server running on port ${port}`);
}));
