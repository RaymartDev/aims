/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { Department } from '@prisma/client';
import { deleteDepartmentById, findDepartmentById, findDepartmentByName, insertDepartment, listDepartments, searchDepartmentByName, updateDepartment } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findDepartment = await findDepartmentByName(req.body.name);
    if (findDepartment) {
      return res.status(200).json({ message: 'Department with that name already exists' });
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
      return res.status(400).json({ message: 'Department not found' });
    }

    res.status(200).json({ department, message: 'Successfully found department' });
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
      return res.status(400).json({ message: 'Department not found' });
    }

    const findDepartmentName = await findDepartmentByName(req.body.name);
    if (findDepartmentName && findDepartment.name !== req.body.name) {
      return res.status(400).json({ message: 'Department name already exists!' });
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
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const departments = await listDepartments(page, limit);
    if (departments) {
      res.status(200).json({
        departments: departments.departmentsFinal, message: 'Successfully retrieved departments', misc: {
          page,
          limit,
          maxPage: departments.maxPage || 1,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required!' });
    }

    const findDepartment = await findDepartmentById(parseInt(id));
    if (!findDepartment) {
      return res.status(400).json({ message: 'Department not found' });
    }

    const departmentToDelete = await deleteDepartmentById(parseInt(id));
    if (departmentToDelete) {
      return res.status(200).json({ department: departmentToDelete, message: 'Successfully deleted department' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Department ID is required!' });
    }

    const findDepartment = await findDepartmentById(parseInt(id));
    if (!findDepartment) {
      return res.status(400).json({ message: 'Department not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findDepartment.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated department';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated department';
    }

    const newDepartment = await updateDepartment({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ department: newDepartment, message });
  } catch (err) {
    next(err);
  }
};