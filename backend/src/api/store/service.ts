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

export async function updateStoreRegistration(status: boolean, id: number): Promise<Store | null> {
  try {
    const updatedStore = await prisma.store.update({
      data: {
        registered: status,
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

interface StoreType {
  id: number;
  company_name: string;
  name: string;
  cost_center_code: string;
  address: string;
  registered_status: boolean;
}

export async function listStores(page: number, limit: number): Promise<{ storesFinal: StoreType[], totalPages: number }> {
  try {
    // Get total count for pagination
    const totalStores = await prisma.store.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalStores / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const stores = await prisma.store.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        name: 'asc',
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });
    if (stores && stores.length > 0) {
      const storesFinal: StoreType[] = stores.map((store) => ({
        id: store.id,
        company_name: store.company.name,
        name: store.name,
        cost_center_code: store.cost_center_code,
        address: store.address,
        registered_status: store.registered,
      }));

      return { storesFinal: storesFinal, totalPages };
    }
    
    return { storesFinal: [], totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}