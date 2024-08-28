/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findDepartmentById, findDepartmentByName, insertDepartment, updateDepartment } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findDepartment = await findDepartmentByName(req.body.department || '');
    if (findDepartment) {
      return res.status(400).json({ message: 'Department with that name already exists' });
    }
    const newDepartment = await insertDepartment({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newDepartment) {
      res.status(200).json({ department: newDepartment, message: 'Successfully created department' });
    }
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
    if (!department) {
      return res.status(400).json({ message: 'Department could not be found!' });
    }
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
    const findDepartment = await findDepartmentById(parseInt(id));
    if (!findDepartment) {
      return res.status(400).json({ message: 'Department could not be found!' });
    }

    const newDepartment = await updateDepartment({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newDepartment) {
      res.status(200).json({ department: newDepartment, message: 'Successfully updated department' });
    }
  } catch (err) {
    next(err);
  }
};