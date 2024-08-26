import { Company, Department, Employee } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertEmployee(employee: any): Promise<Employee | null> {
  try {
    const createEmployee = await prisma.employee.create({
      data: {
        ...employee,
      },
    });
    return createEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateEmployee(employee: any, id: number): Promise<Employee | null> {
  try {
    const createEmployee = await prisma.employee.update({
      data: {
        ...employee,
      },
      where: { id },
    });
    return createEmployee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findDepartmentByName(name: string): Promise<Department | null> {
  try {
    const dept = await prisma.department.findFirst({
      where: { name },
    });
    return dept;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findEmployeeById(id: number): Promise<Employee | null> {
  try {
    const employee = await prisma.employee.findFirst({
      where: { id },
    });
    return employee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findCompanyByName(name: string): Promise<Company | null> {
  try {
    const dept = await prisma.company.findFirst({
      where: { name },
    });
    return dept;
  } catch (error) {
    throw new Error('Database error');
  }
}