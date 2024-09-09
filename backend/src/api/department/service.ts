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

export async function findDepartmentByName(name: string): Promise<Department | null> {
  try {
    const dept = await prisma.department.findFirst({
      where: { name: {
        equals: name,
      } },
    });
    return dept;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchDepartmentByName(name: string): Promise<Department[]> {
  try {
    const departments: Department[] = await prisma.department.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });
    return departments;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface DepartmentType {
  id: number;
  name: string;
}

export async function listDepartments(page: number, limit: number): Promise<{ departmentsFinal: DepartmentType[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalDepartments = await prisma.department.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalDepartments / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const departments: Department[] = await prisma.department.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        name: 'asc',
      },
    });
    if (departments && departments.length > 0) {
      const departmentsFinal = departments.map((department) => ({
        id: department.id,
        name: department.name,
      }));
      
      return { departmentsFinal, maxPage: totalDepartments };
    }
    
    return { departmentsFinal: [], maxPage: totalDepartments };
  } catch (error) {
    throw new Error('Database error');
  }
}