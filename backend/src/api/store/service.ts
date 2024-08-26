import { Company, Department, Store } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertStore(store: any): Promise<Store | null> {
  try {
    const createStore = await prisma.store.create({
      data: {
        ...store,
      },
    });
    return createStore;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateStore(store: any, id: number): Promise<Store | null> {
  try {
    const updatedStore = await prisma.store.update({
      data: {
        ...store,
      },
      where: { id },
    });
    return updatedStore;
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

export async function findStoreById(id: number): Promise<Store | null> {
  try {
    const store = await prisma.store.findFirst({
      where: { id },
    });
    return store;
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