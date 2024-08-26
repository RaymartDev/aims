import { Department } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertDepartment(department: any): Promise<Department | null> {
  try {
    const createDepartment = await prisma.department.create({
      data: {
        ...department,
      },
    });
    return createDepartment;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateDepartment(department: any, id: number): Promise<Department | null> {
  try {
    const updatedDepartment = await prisma.department.update({
      data: {
        ...department,
      },
      where: { id },
    });
    return updatedDepartment;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findDepartmentById(id: number): Promise<Department | null> {
  try {
    const department = await prisma.department.findFirst({
      where: { id },
    });
    return department;
  } catch (error) {
    throw new Error('Database error');
  }
}