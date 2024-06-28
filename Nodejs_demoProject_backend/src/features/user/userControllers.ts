import { Request, Response } from 'express';
import UserService from "./userServices"
interface AuthRequest extends Request {
  user?: string;
}
//my-profile

export const myProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const userData = await UserService.getUserData(user!);
    res.status(200).json(userData);
  }
  catch (error) {
    res.status(400).json(error);
  }
};

// Update user profile
export const updateUserProfile = async (req: AuthRequest, res: Response) => {


  try {
    const { user } = req
    const updates = req.body;
    const updated_user = await UserService.updateUserProfile(user!, updates);
    if (!updated_user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updated_user);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};


export const getLatestUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getLatestUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};
export const blockUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const blocked_user = await UserService.blockUser(id!);
    if (!blocked_user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(blocked_user);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};
