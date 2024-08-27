/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findDepartmentById, findDepartmentByName, insertDepartment, listDepartments, searchDepartmentByName, updateDepartment } from './service';
import { Department } from '@prisma/client';

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

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;
    
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name query parameter is required and must be a string' });
    }

    const departments: Department[] = await searchDepartmentByName(name as string);
    if (departments.length > 0) {
      res.status(200).json({ departments, message: 'Successfully found departments' });
    }
  } catch (err) {
    next(err);
  }
};


export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const departments: Department[] = await listDepartments(page, 10);
    if (departments) {
      res.status(200).json({ departments, message: 'Successfully retrieved departments' });
    }
  } catch (err) {
    next(err);
  }
};