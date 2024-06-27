import { Request, Response } from 'express';
import TaskService from './taskService';
import { AuthRequest } from '../../middlewares/authMiddleware';


// Create a new task
export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const task = await TaskService.createTask(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Get all tasks for the authenticated user
export const getTasks = async (req: AuthRequest, res: Response) => {

    const { userId } = req.body
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const tasks = await TaskService.getTasks(userId);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get a specific task by ID for the authenticated user
export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await TaskService.getTaskById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Update a specific task by ID for the authenticated user
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const task = await TaskService.updateTask(id, updates);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Delete a specific task by ID for the authenticated user
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.body

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const task = await TaskService.deleteTask(id, userId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

export const getUpcomingTask = async (req: AuthRequest, res: Response) =>{
    try {
        const { userId } = req.body
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const tasks = await TaskService.getUpcomingTask(userId);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
}



//Admin


export const getUserTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tasks = await TaskService.particularUser(id);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Admin function to get all tasks (for all users)
export const getAllUserTask = async (req: Request, res: Response) => {
    try {

        const tasks = await TaskService.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Admin function to delete any user's task
export const deleteUserTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const task = await TaskService.adminDeleteTask(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};

// Admin function to update any user's task
export const updateUserTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { title, description, dewDate, status } = req.body;

    try {
        const task = await TaskService.adminUpdateTask(id, title, description, dewDate, status);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};
export const createTaskByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        req.body.userId = id;
        const task = await TaskService.createTaskByAdmin(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json("something went wrong");
    }
};