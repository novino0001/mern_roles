import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import User from '../models/userModel';

export const roleMiddleware =  (role: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
   const {userId} = req.body; 
  const user = await User.findOne({_id : userId}); 
    if ( user?.role !== role) {    
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
};
