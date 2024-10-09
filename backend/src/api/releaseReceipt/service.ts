import { Release, Release_Receiver, Release_Shipped } from '@prisma/client';
import prisma from '../../lib/prisma';

interface DetailedRelease {
  detail: any[];
}

export async function getReferenceNumber(): Promise<number> {
  try {
    const maxRelease = await prisma.release.findFirst({
      orderBy: {
        release_number: 'desc',
      },
      select: {
        release_number: true,
      },
    });

    const releaseNumber = maxRelease ? (maxRelease.release_number + 1) : 1;
    return releaseNumber;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function received(id: number): Promise<Release_Receiver | null | undefined> {
  try {
    const updatedRelease = await prisma.release.findFirst({
      where: {
        id,
      },
      include: {
        release_receiver: true,
      },
    });
            
    return updatedRelease?.release_receiver;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function shipped(id: number): Promise<Release_Shipped | null | undefined> {
  try {
    const updatedRelease = await prisma.release.findFirst({
      where: {
        id,
      },
      include: {
        release_shipped: true,
      },
    });
          
    return updatedRelease?.release_shipped;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateRelease(body: any, id: number): Promise<Release> {
  try {
    const updatedRelease = await prisma.release.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
      
    return updatedRelease;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function createReleaseShipper(body: any): Promise<Release_Shipped | null> {
  try {
    const createdRelease = await prisma.release_Shipped.create({
      data: {
        ...body,
      },
    });
    
    return createdRelease;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function createReleaseReceiver(body: any): Promise<Release_Receiver | null> {
  try {
    const createdRelease = await prisma.release_Receiver.create({
      data: {
        ...body,
      },
    });
      
    return createdRelease;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findReleaseByNumber(id: number): Promise<Release | null> {
  try {
    const release = await prisma.release.findUnique({
      where: {
        id,
      },
    });
    return release;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function createAndCancelRelease(id: number, materialIds: number[], relead_to: string, date_out: Date): Promise<void> {
  try {
    const release = await prisma.release.findUnique({
      where: { id },
      include: {
        release_detail: true,
      },
    });
    
    if (!release) {
      throw new Error('Release not found');
    }

    const releaseDetails = release.release_detail;
    const isFullCancellation = releaseDetails.every(detail => materialIds.includes(detail.material_id));

    if (isFullCancellation) {
      // Full cancellation
      await prisma.release.update({
        where: { id },
        data: { status: 4 }, // Status 4: Cancelled
      });
    } else {
      // Partial cancellation
      const newRelease = await prisma.release.create({
        data: {
          release_number: release.release_number,
          status: 4, // Status 4: Cancelled
          requestor_id: release.requestor_id,
          release_shipped_id: release.release_shipped_id,
          release_receiver_id: release.release_receiver_id,
          date_out,
          relead_to,
          modified_by_id: release.modified_by_id,
          // Add any other fields as needed
        },
      });
    
      // Update the selected `release_detail` to reference the new release
      await prisma.release_Detail.updateMany({
        where: {
          release_number: release.release_number,
          material_id: {
            in: materialIds,
          },
        },
        data: {
          release_number: newRelease.id,
        },
      });
    }
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function insertRelease(release: any, detail: DetailedRelease, user_id: number): Promise<Release | null> {
  try {
    if (detail.detail.length > 0) {
      for (const item of detail.detail) {
        const inventoryItem = await prisma.inventory.findUnique({
          where: {
            material_id: item.material_id,
          },
          select: {
            available: true,
            material: true,
          },
        });
    
        if (!inventoryItem) {
          throw new Error(`Inventory record for material_id: ${item.material_id} not found`);
        }
    
        if (item.quantity > inventoryItem.available) {
          throw new Error(`Insufficient stock for ${inventoryItem.material.description}. Available: ${inventoryItem.available}, Requested: ${item.quantity}`);
        }
      }
    }
    const createdRelease = await prisma.release.create({
      data: {
        ...release,
        requestor_id: user_id,
      },
    });
    if (detail.detail.length > 0) {
      const releaseDetails = detail.detail.map(item => ({
        ...item,
        release_number: release.release_number,
      }));

      await prisma.release_Detail.createMany({
        data: releaseDetails,
      });

      // Fetch inventory data to validate quantities

      await Promise.all(
        detail.detail.map(async (item) => {
          await prisma.inventory.updateMany({
            where: {
              material_id: item.material_id,
            },
            data: {
              available: {
                decrement: item.quantity, // Decrease the available stock by the item's quantity
              },
              total_balance: {
                decrement: item.quantity, // Decrease the available stock by the
              },
              remaining_balance: {
                decrement: item.quantity,
              },
              quantity_out: {
                increment: item.quantity, // Increment the quantity
              },
            },
          });
        }),
      );
    }
    return createdRelease;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Database error');
  }
}

interface ReleaseFinal {
  id: number;
  release_number: number;
  requestor: {
    name: string;
    employee_no: string;
    cost_center_code: string;
  };
  shipped_by: {
    name: string;
    date: Date;
  } | null;
  received_by: {
    name: string;
    date: Date;
  } | null;
  details: {
    release_number: number;
    desc: string;
    quantity: number;
    remarks: string;
  }[]
  status: number;
}

export async function searchReleaseByRef(ref: string = '**--**'): Promise<ReleaseFinal[]> {
  try {
    const releases = await prisma.release.findMany({
      where: {
        release_number: {
          equals: isNaN(parseInt(ref)) ?  1 : parseInt(ref),
        },
        deleted: false,
      },
      take: 10,
      orderBy: {
        release_number: 'asc',
      },
      include: {
        requestor: true,
        release_receiver: true,
        release_shipped: true,
        release_detail: {
          include: {
            material: true,
          },
        },
      },
    });
    if (releases && releases.length > 0) {
      const releasesFinal = releases.map((release) => ({
        id: release.id,
        release_number: release.release_number,
        requestor: {
          name: release.requestor.name, 
          employee_no: release.requestor.employee_no,
          cost_center_code: release.requestor.cost_center_code,
        },
        shipped_by: release.release_shipped ? {
          name: release.release_shipped.name,
          date: release.release_shipped.shipped_date,
        } : null,
        received_by: release.release_receiver ? {
          name: release.release_receiver.name,
          date: release.release_receiver.receive_date,
        } : null,
        status: release.status,
        details: release.release_detail.map(detail => ({
          detail_id: detail.id,
          release_number: detail.release_number,
          desc: detail.material.description, // Assuming material has a 'name' field
          material_id: detail.material.id,
          quantity: detail.quantity,
          remarks: detail.remarks,
        })),
      }));
        
      return releasesFinal;
    }
    return [];
  } catch (error) {
    throw new Error('Database error');
  }
}


export async function listReleases(page: number, limit: number): Promise<{ releasesFinal: ReleaseFinal[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalRelease = await prisma.release.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalRelease / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const releases = await prisma.release.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        release_number: 'asc',
      },
      where: {
        deleted: false,
      },
      include: {
        requestor: true,
        release_receiver: true,
        release_shipped: true,
        release_detail: {
          include: {
            material: true,
          },
        },
      },
    });
    if (releases && releases.length > 0) {
      const releasesFinal = releases.map((release) => ({
        id: release.id,
        release_number: release.release_number,
        requestor: {
          name: release.requestor.name, 
          employee_no: release.requestor.employee_no,
          cost_center_code: release.requestor.cost_center_code,
        },
        shipped_by: release.release_shipped ? {
          name: release.release_shipped.name,
          date: release.release_shipped.shipped_date,
        } : null,
        received_by: release.release_receiver ? {
          name: release.release_receiver.name,
          date: release.release_receiver.receive_date,
        } : null,
        status: release.status,
        details: release.release_detail.map(detail => ({
          detail_id: detail.id,
          release_number: detail.release_number,
          desc: detail.material.description, // Assuming material has a 'name' field
          material_id: detail.material.id,
          quantity: detail.quantity,
          remarks: detail.remarks,
        })),
      }));
      
      return { releasesFinal, maxPage: totalPages };
    }
    
    return { releasesFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}