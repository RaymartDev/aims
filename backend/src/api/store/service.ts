import { Store } from '@prisma/client';
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

export async function findStoreByCostCode(cost_center_code: string): Promise<Store | null> {
  try {
    const store = await prisma.store.findFirst({
      where: { cost_center_code },
    });
    return store;
  } catch (error) {
    throw new Error('Database error');
  }
}