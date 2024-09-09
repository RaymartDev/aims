/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findEmployeeByEmployeeNo, findEmployeeById, insertEmployee, listEmployees, searchEmployeeByEmployeeNo, updateEmployee } from './service';
import { findCompanyByName } from '../company/service';
import { findDepartmentByName } from '../department/service';
import { Employee } from '@prisma/client';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const {
      first_name,
      last_name,
      employee_no,
      cost_center_code,
      company,
      date_hired,
      department,
      division,
    } = req.body;

    if (!employee_no) {
      return res.status(400).json({ message: 'Employee number must be provided' });
    }

    const findEmployee = await findEmployeeByEmployeeNo(employee_no);
    if (findEmployee) {
      return res.status(400).json({ message: 'Employee number already exists!' });
    }

    const findCompany = await findCompanyByName(company);
    if (!findCompany) {
      return res.status(400).json({ message: 'Company not found!' });
    }

    const findDepartment = await findDepartmentByName(department);
    if (!findDepartment) {
      return res.status(400).json({ message: 'Department not found!' });
    }

    const newEmployee = await insertEmployee({ 
      first_name,
      last_name,
      employee_no,
      cost_center_code,
      company_id: findCompany.id,
      date_hired,
      department_id: findDepartment.id,
      division,
      registered: 0,
      modified_by_id: req.user?.id || 1,
    });
    
    if (newEmployee) {
      res.status(200).json({ employee: newEmployee, message: 'Successfully created employee' });
    }
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
    if (!employee) {
      return res.status(400).json({ message: 'Employee not found!' });
    }

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

    const findEmployee = await findEmployeeById(parseInt(id));
    if (!findEmployee) {
      return res.status(400).json({ message: 'Employee not found!' });
    }

    const newEmployee = await updateEmployee({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newEmployee) {
      res.status(200).json({ employee: newEmployee, message: 'Successfully updated employee' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { employee_no } = req.query;
    
    if (!employee_no || typeof employee_no !== 'string') {
      return res.status(400).json({ error: 'Employee no query parameter is required and must be a string' });
    }

    const employees: Employee[] = await searchEmployeeByEmployeeNo(employee_no as string);
    if (employees.length > 0) {
      res.status(200).json({ employees, message: 'Successfully found employees' });
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

    const employees: Employee[] = await listEmployees(page, 10);
    if (employees) {
      res.status(200).json({ employees, message: 'Successfully retrieved employees' });
    }
  } catch (err) {
    next(err);
  }
};