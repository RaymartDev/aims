import { Company, Department, Supplier } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertSupplier(supplier: any): Promise<Supplier | null> {
  try {
    const createSupplier = await prisma.supplier.create({
      data: {
        ...supplier,
      },
    });
    return createSupplier;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateSupplier(supplier: any, id: number): Promise<Supplier | null> {
  try {
    const updatedSupplier = await prisma.supplier.update({
      data: {
        ...supplier,
      },
      where: { id },
    });
    return updatedSupplier;
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

export async function findSupplierById(id: number): Promise<Supplier | null> {
  try {
    const supplier = await prisma.supplier.findFirst({
      where: { id },
    });
    return supplier;
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