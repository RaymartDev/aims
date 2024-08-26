/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findDepartmentById, insertDepartment, updateDepartment } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newDepartment = await insertDepartment({ ...req.body });
    res.status(200).json({ department: newDepartment, message: 'Successfully created department' });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required!' });
    }
    const department = await findDepartmentById(parseInt(id));
    res.status(200).json( { department, message: 'Successfully found department' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required!' });
    }
    const newDepartment = await updateDepartment({ ...req.body }, parseInt(id));
    res.status(200).json({ department: newDepartment, message: 'Successfully updated department' });
  } catch (err) {
    next(err);
  }
};