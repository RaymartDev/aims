/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateHashedPassword, generateToken } from '../../lib';
import { createUser, findUserByEmployeeId, findUserByStoreId, findUserByUsername, findUserByUsernameLogin, updateUser } from './service';
import UserRequest from '../../interfaces/UserRequest';
import { findDepartmentByName } from '../department/service';
import { findEmployeeById, updateEmployeeRegistration } from '../employee/service';
import { findStoreById, updateStoreRegistration } from '../store/service';

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
    admin,
  } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required!' });
  }
  if (!password) {
    return res.status(400).json({ message: 'Password is required!' });
  }

  if (!req.user?.admin) {
    return res.status(404).json({ message: 'You are not permitted to do that!' });
  }

  if (!registrationType) {
    return res.status(401).json({ message: 'Registration type must be specified!' });
  }

  if (!employee_id && !store_id) {
    if (registrationType === 'employee') {
      return res.status(401).json({ message: 'Please enter an Employee ID' });
    }
    if (registrationType === 'store') {
      return res.status(401).json({ message: 'Please enter an Store ID' });
    }
    return res.status(401).json({ message: 'Please enter a valid registration type' });
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

    if (registrationType === 'employee') {
      const employee = await findEmployeeById(parseInt(employee_id));
      if (!employee) {
        return res.status(404).json({ message: 'Employee does not exist' });
      }

      const findRegisteredStatus = await findUserByEmployeeId(parseInt(employee_id));
      if (findRegisteredStatus) {
        return res.status(401).json({ message: 'This employee is already registered' });
      }
      if (!employee_number) {
        return res.status(401).json({ message: 'Employee number is required!' });
      }
      if (!name) {
        return res.status(401).json({ message: 'Name is required!' });
      }
      if (!admin) {
        return res.status(401).json({ message: 'Admin status is required!' });
      }
    }

    if (registrationType === 'store') {
      const store = await findStoreById(parseInt(store_id));
      if (!store) {
        return res.status(404).json({ message: 'Store does not exist' });
      }
      const findRegisteredStatus = await findUserByStoreId(parseInt(store_id));
      if (findRegisteredStatus) {
        return res.status(401).json({ message: 'This store is already registered' });
      }
      if (!cost_center_code) {
        return res.status(401).json({ message: 'Cost center code is required!' });
      }
      if (!name) {
        return res.status(401).json({ message: 'Name is required!' });
      }
    }

    // Hash the password
    const hashedPassword = await generateHashedPassword(password);

    const newUser = {
      employee_id: registrationType === 'employee' ? employee_id : null,
      store_id: registrationType === 'store' ? store_id : null,
      role_id: registrationType === 'employee' ? (admin === 'y' ? 2 : 1) : 1,
      name,
      username,
      password: hashedPassword,
      department_id: findDepartment.id,
      cost_center_code,
      employee_no: employee_number,
      division,
      modified_by_id: req.user?.id || 1,
    };

    if (registrationType === 'employee') {
      await updateEmployeeRegistration(true, employee_id);
    } else {
      await updateStoreRegistration(true, store_id);
    }
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
      return res.status(401).json({ message: 'Invalid old password' });
    }

    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid old password' });
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
    const findUser = await findUserByUsernameLogin(username);
    if (!findUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Hash the password before comparing it to the stored hash
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // create token
    const token = generateToken({
      id: findUser.id,
      username: findUser.username,
      name: findUser.name,
      admin: findUser.role?.name.toLowerCase().includes('admin'),
      employee_number: findUser.employee_no,
      cost_code: findUser.cost_center_code,
    });
    res.cookie('token', token, {
      httpOnly: true,   // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production',  // Use HTTPS in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });
    res.status(200).json({ message: 'Successfully logged in', token });
  } catch (err) {
    next(err);
  }

};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true });
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    next(err);
  }
};