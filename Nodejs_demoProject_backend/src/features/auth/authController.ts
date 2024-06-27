import { Request, Response } from 'express';
import AuthService from './authService';

export const signup = async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;
  try {
    const user = await AuthService.register(email, password, fullName);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json("somthing went wrong");
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await AuthService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json("somthing went wrong");
  }
};
