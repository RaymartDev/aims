/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteEmployeeById, findEmployeeByEmployeeNo, findEmployeeById, insertEmployee, listEmployees, searchEmployeeByEmployeeNo, updateEmployee } from './service';
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

    const findEmployeeNo = await findEmployeeByEmployeeNo(req.body.employee_no);
    if (findEmployeeNo) {
      return res.status(400).json({ message: 'Employee number already exists!' });
    }

    const { department_name, company_name, ...restOfBody } = req.body;

    // Create an update dictionary
    const updateData: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };

    if (department_name) {
      const findDepartment = await findDepartmentByName(department_name);
      if (!findDepartment) {
        return res.status(400).json({ message: 'Department not found!' });
      }
      updateData.department_id = findDepartment.id; // Add department_id to the update dictionary
    }

    if (company_name) {
      const findCompany = await findCompanyByName(company_name);
      if (!findCompany) {
        return res.status(400).json({ message: 'Company not found' });
      }
      updateData.company_id = findCompany.id;
    }

    Object.assign(updateData, restOfBody);

    const newEmployee = await updateEmployee(updateData, parseInt(id));
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
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const employees = await listEmployees(page, limit);
    if (employees) { 
      res.status(200).json({ employees: employees.employeesFinal, message: 'Successfully retrieved employees', misc: {
        page,
        limit,
        totalPages: employees.totalPages || 1,
      } });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required!' });
    }

    const findEmployee = await findEmployeeById(parseInt(id));
    if (!findEmployee) {
      return res.status(400).json({ message: 'Employee not found' });
    }

    const employeeToDelete = await deleteEmployeeById(parseInt(id));
    if (employeeToDelete) {
      return res.status(200).json({ employee: employeeToDelete, message: 'Successfully deleted employee' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Employee ID is required!' });
    }

    const findEmployee = await findEmployeeById(parseInt(id));
    if (!findEmployee) {
      return res.status(400).json({ message: 'Employee not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findEmployee.effective_to);
    
    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated employee';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = today;
      message = 'Successfully de-activated employee';
    }

    const newEmployee = await updateEmployee({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ employee: newEmployee, message });
  } catch (err) {
    next(err);
  }
};