import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig';
const { secretKey } = envConfig();

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }
  try {
    const decoded: jwt.JwtPayload = jwt.verify(token, secretKey) as jwt.JwtPayload;
    req.user = decoded.id; 
    req.body.userId = req.user
    next();
  } catch (error) {
    console.log("----error-------");
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
