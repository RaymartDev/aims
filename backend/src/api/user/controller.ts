import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../../lib';
import { findUserByUsername } from './service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: CREATE user
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if username exists
    const findUser = await findUserByUsername(username);
    if (!findUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Hash the password before comparing it to the stored hash
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // create token
    const token =  generateToken({ id: findUser.id, username: findUser.username });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }

};
