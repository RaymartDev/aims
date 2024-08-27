import { Employee } from '@prisma/client';
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

export async function findEmployeeByEmployeeNo(employee_no: string): Promise<Employee | null> {
  try {
    const employee = await prisma.employee.findFirst({
      where: { employee_no },
    });
    return employee;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchEmployeeByEmployeeNo(employee_no: string): Promise<Employee[]> {
  try {
    const employees: Employee[] = await prisma.employee.findMany({
      where: {
        employee_no: {
          startsWith: employee_no,
        },
      },
      take: 10,
      orderBy: {
        employee_no: 'asc',
      },
    });
    return employees;
  } catch (error) {
    throw new Error('Database error');
  }
}