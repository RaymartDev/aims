/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findEmployeeById, insertEmployee, updateEmployee } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newEmployee = await insertEmployee({ ...req.body });
    res.status(200).json({ employee: newEmployee, message: 'Successfully created employee' });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required!' });
    }
    const employee = await findEmployeeById(parseInt(id));
    res.status(200).json( { employee, message: 'Successfully found employee' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required!' });
    }
    const newEmployee = await updateEmployee({ ...req.body }, parseInt(id));
    res.status(200).json({ employee: newEmployee, message: 'Successfully updated employee' });
  } catch (err) {
    next(err);
  }
};