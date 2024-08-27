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

export async function searchStoreByCostCode(cost_code: string): Promise<Store[]> {
  try {
    const stores: Store[] = await prisma.store.findMany({
      where: {
        cost_center_code: {
          startsWith: cost_code,
        },
      },
      take: 10,
      orderBy: {
        cost_center_code: 'asc',
      },
    });
    return stores;
  } catch (error) {
    throw new Error('Database error');
  }
}