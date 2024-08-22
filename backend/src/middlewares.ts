import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ErrorResponse from './interfaces/ErrorResponse';
import UserInterface from './interfaces/UserInterface';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

interface JwtPayload {
  id: number;
  username: string;
}

interface UserRequest extends Request {
  user?: UserInterface;
}

export function authenticateToken(req: UserRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token using the promisified version
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Attach user information to the request object
    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}
