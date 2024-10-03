import { Delivery } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertDelivery(delivery: any): Promise<Delivery | null> {
  try {
    const createDelivery = await prisma.delivery.create({
      data: {
        ...delivery,
      },
    });
    return createDelivery;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateDelivery(delivery: any, id: number): Promise<Delivery | null> {
  try {
    const updatedDelivery = await prisma.delivery.update({
      data: {
        ...delivery,
      },
      where: { id },
    });
    return updatedDelivery;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findDeliveryById(id: number): Promise<Delivery | null> {
  try {
    const delivery = await prisma.delivery.findFirst({
      where: { id, deleted: false },
    });
    return delivery;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function deleteDeliveryById(id: number): Promise<Delivery | null> {
  try {
    const delivery = await prisma.delivery.update({
      data: {
        deleted: true,
      },
      where: { id },
    });
    return delivery;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchDeliveryByReferenceOrDesc(ref: string = '**--**'): Promise<Delivery[]> {
  try {
    const deliveries: Delivery[] = await prisma.delivery.findMany({
      where: {
        deleted: false,
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
    return deliveries;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface DeliveryType {
  id: number;
  description: string,
  serial_number: string,
  asset_number: string,
  unit: string,
  remarks: string,
}

export async function listDeliveries(page: number, limit: number): Promise<{ deliveriesFinal: DeliveryType[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalDeliveries = await prisma.delivery.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalDeliveries / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const deliveries = await prisma.delivery.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: 'asc',
      },
      where: {
        deleted: false,
      },
      include: {
        material: true,
      },
    });
    if (deliveries && deliveries.length > 0) {
      const deliveriesFinal = deliveries.map((delivery) => ({
        id: delivery.id,
        description: delivery.material.description,
        serial_number: delivery.material.serial_number || '',
        asset_number: delivery.material.asset_number || '',
        quantity: delivery.quantity || 0,
        unit: delivery.material.unit_of_measure,
        remarks: delivery.remarks,
      }));
      
      return { deliveriesFinal, maxPage: totalPages };
    }
    
    return { deliveriesFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}