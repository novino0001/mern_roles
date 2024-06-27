import express from 'express';
import { createTask, updateTask, deleteTask, getTasks, getTaskById ,getUserTask,getAllUserTask , deleteUserTask , updateUserTask, createTaskByAdmin} from './taskController';
import { authMiddleware } from "../../middlewares/authMiddleware"
import { roleMiddleware } from "../../middlewares/roleMiddleware"
 
 

const taskRoutes = express.Router();

taskRoutes.post('/createTask', authMiddleware, createTask);
taskRoutes.get('/getAllTask', authMiddleware, getTasks);
taskRoutes.get('/getTaskById/:id', authMiddleware, getTaskById);
taskRoutes.patch('/updateTaskById/:id', authMiddleware, updateTask);
taskRoutes.delete('/deleteTask/:id', authMiddleware, deleteTask);

// Admin routes
taskRoutes.get('/admin/user/:id', authMiddleware, roleMiddleware('admin'), getUserTask); 
taskRoutes.get('/admin/alluser-task', authMiddleware, roleMiddleware('admin'), getAllUserTask); 
taskRoutes.delete('/admin/delete-task/:id', authMiddleware, roleMiddleware('admin'), deleteUserTask); 
taskRoutes.patch('/admin/update-task/:id', authMiddleware, roleMiddleware('admin'), updateUserTask); 
taskRoutes.post('/createTaskByAdmin/:id',authMiddleware,roleMiddleware('admin'), createTaskByAdmin);



export default taskRoutes;




