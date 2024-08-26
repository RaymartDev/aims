/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateHashedPassword, generateToken } from '../../lib';
import { createUser, findDepartmentByName, findUserByUsername, updateUser } from './service';
import UserRequest from '../../interfaces/UserRequest';

export const register = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { 
    registrationType,
    employee_id,
    store_id,
    name,
    employee_number,
    username,
    password,
    department,
    division,
    cost_center_code,
  } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (!req.user?.admin) {
    return res.status(404).json({ message: 'You are not permitted to do that!' });
  }

  try {
    // Check if username exists
    const findUser = await findUserByUsername(username);
    if (findUser) {
      return res.status(401).json({ message: 'Username already exists' });
    }

    const findDepartment = await findDepartmentByName(department);
    if (!findDepartment) { 
      return res.status(401).json({ message: 'Department does not exist' });
    }

    // Hash the password
    const hashedPassword = await generateHashedPassword(password);

    const newUser = {
      employee_id: registrationType === 'employee' ? employee_id : null,
      store_id: registrationType === 'store' ? store_id : null,
      role_id: registrationType === 'employee' ? 1 : 2,
      name,
      username,
      password: hashedPassword,
      department_id: findDepartment.id,
      cost_center_code,
      employee_no: employee_number,
      division,
    };

    const user = await createUser(newUser);
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req: UserRequest, res: Response, next: NextFunction) => {
  const { password, newPassword } = req.body;

  try {
    const findUser = await findUserByUsername(req.user?.username || '');
    if (!findUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const hashedPassword = await generateHashedPassword(newPassword);
    const user = updateUser(req.user?.username || '', { password: hashedPassword });
    res.status(201).json({ user, message: 'Successfully updated password' });
  } catch (err) {
    next(err);
  }
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
    const token =  generateToken({ id: findUser.id, username: findUser.username, name: findUser.name });
    res.status(200).json({ token, message: 'Successfully logged in' });
  } catch (err) {
    next(err);
  }

};
