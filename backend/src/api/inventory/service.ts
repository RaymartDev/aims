import { Inventory } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertInventory(inventory: any): Promise<Inventory | null> {
  try {
    const createInventory = await prisma.inventory.create({
      data: {
        ...inventory,
      },
    });
    return createInventory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateInventory(inventory: any, id: number): Promise<Inventory | null> {
  try {
    const updatedInventory = await prisma.inventory.update({
      data: {
        ...inventory,
      },
      where: { id },
    });
    return updatedInventory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findInventoryById(id: number): Promise<Inventory | null> {
  try {
    const inventory = await prisma.inventory.findFirst({
      where: { id },
    });
    return inventory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchInventory(ref: string = '**--**'): Promise<Inventory[]> {
  try {
    const inventories: Inventory[] = await prisma.inventory.findMany({
      where: {
        effective_from: {
          lte: new Date(),
        },
        effective_to: {
          gte: new Date(),
        },
        OR: [
          {
            id: {
              equals: parseInt(ref),
            },
          },
          {
            material: {
              description: {
                startsWith: ref,
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        id: 'asc',
      },
    });
    return inventories;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface InventoryType {
  id: number;
  material_code: string;
  description: string;
  total_balance: number;
  remaining_balance: number;
  quantity_out: number;
  available: number;
  return: number;
  unit: string;
  material_type: string;
  cost: number;
  date_entry: Date;
}

export async function listInventories(page: number, limit: number): Promise<{ inventoriesFinal: InventoryType[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalInventories = await prisma.inventory.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalInventories / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const inventories = await prisma.inventory.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: 'asc',
      },
      include: {
        material: {
          include: {
            type: true,
          },
        },
      },
    });
    if (inventories && inventories.length > 0) {
      const inventoriesFinal = inventories.map((inventory) => ({
        id: inventory.id,
        material_code: inventory.material.material_code,
        description: inventory.material.description,
        total_balance: inventory.total_balance,
        remaining_balance: inventory.remaining_balance,
        quantity_out: inventory.quantity_out,
        available: inventory.available,
        return: inventory.return,
        unit: inventory.material.unit_of_measure,
        material_type: inventory.material.type.description,
        cost: inventory.material.cost,
        date_entry: inventory.material.date_entry,
      }));
      
      return { inventoriesFinal, maxPage: totalPages };
    }
    
    return { inventoriesFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}