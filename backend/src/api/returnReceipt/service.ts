import { Return } from '@prisma/client';
import prisma from '../../lib/prisma';

interface DetailedReturn {
  detail: any[];
}

export async function getReferenceNumber(): Promise<number> {
  try {
    const maxReturn = await prisma.return.findFirst({
      orderBy: {
        return_number: 'desc',
      },
      select: {
        return_number: true,
      },
    });

    const releaseNumber = maxReturn ? (maxReturn.return_number + 1) : 1;
    return releaseNumber;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function insertReturn(arReturn: any, detail: DetailedReturn, user_id: number, modifier: number): Promise<Return | null> {
  try {
    if (detail.detail.length > 0) {
      for (const item of detail.detail) {
        const inventoryItem = await prisma.inventory.findUnique({
          where: {
            material_id: item.material_id,
          },
          select: {
            quantity_out: true,
            material: true,
          },
        });
        
        if (!inventoryItem) {
          throw new Error(`Record for material_id: ${item.material_id} not found, Please make delivery first`);
        }

        if (item.quantity > inventoryItem.quantity_out) {
          throw new Error(`Error return for ${inventoryItem.material.description}. Quantity Out: ${inventoryItem.quantity_out}, Requested: ${item.quantity}`);
        }
      }

      const createdReturn = await prisma.return.create({
        data: {
          ...arReturn,
          requestor_id: user_id,
          modified_by_id: modifier,
        },
      });

      const returnDetails = detail.detail.map(item => ({
        ...item,
        return_number: createdReturn.id,
      }));

      await prisma.return_Detail.createMany({
        data: returnDetails,
      });

      await Promise.all(
        detail.detail.map(async (item) => {
          await prisma.inventory.updateMany({
            where: {
              material_id: item.material_id,
            },
            data: {
              available: {
                increment: item.quantity, 
              },
              total_balance: {
                increment: item.quantity, 
              },
              remaining_balance: {
                increment: item.quantity, 
              },
              quantity_out: {
                decrement: item.quantity, 
              },
              return: {
                increment: item.quantity,
              },
            },
          });
        }),
      );

      // Handle partial or full return by updating or deleting release details
      await Promise.all(
        detail.detail.map(async (item) => {
          const releaseDetail = await prisma.release_Detail.findFirst({
            where: {
              material_id: item.material_id,
              release_number: arReturn.release_number,
            },
          });

          if (releaseDetail) {
            if (releaseDetail.quantity <= item.quantity) {
              // Full return of the material, delete the release_detail record
              await prisma.release_Detail.delete({
                where: { id: releaseDetail.id },
              });
            } else {
              // Partial return, update the quantity in release_detail
              await prisma.release_Detail.update({
                where: { id: releaseDetail.id },
                data: { quantity: { decrement: item.quantity } },
              });
            }
          }
        }),
      );
      return createdReturn;
    }
    return null;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface ReturnType {
  id: number;
  return_number: number;
  release_number: number;
  requestor: {
    name: string;
    employee_no: string;
    cost_center_code: string;
  };
  details: {
    detail_id: number;
    material_id: number;
    return_number: number;
    desc: string;
    quantity: number;
  }[];
  tag: string;
  remarks: string;
}

export async function listReturns(page: number, limit: number): Promise<{ returnsFinal: ReturnType[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalReturn = await prisma.return.count();
  
    // Calculate total pages
    const totalPages = Math.ceil(totalReturn / limit);
  
    if (page > totalPages) {
      page = totalPages;
    }
  
    if (page < 1) {
      page = 1;
    }
  
    const returns = await prisma.return.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        return_number: 'asc',
      },
      include: {
        requestor: true,
        return_detail: {
          include: {
            material: true,
          },
        },
      },
    });
    if (returns && returns.length > 0) {
      const returnsFinal = returns.map((returnType) => ({
        id: returnType.id,
        return_number: returnType.return_number,
        release_number: returnType.release_number,
        requestor: {
          name: returnType.requestor.name,
          employee_no: returnType.requestor.employee_no,
          cost_center_code: returnType.requestor.cost_center_code,
        },
        details: returnType.return_detail.map((detail) => ({
          detail_id: detail.id,
          return_number: detail.return_number,
          desc: detail.material.description, // Assuming material has a 'name' field
          material_id: detail.material.id,
          quantity: detail.quantity,
          cost: detail.material.cost,
          unit: detail.material.unit_of_measure,
          serial_number: detail.material.serial_number,
        })),
        remarks: returnType.remarks,
        tag: returnType.tag,
      }));
        
      return { returnsFinal, maxPage: totalPages };
    }
      
    return { returnsFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function reportReturn(start: Date, end: Date) {
  try {
    // Query to fetch returns data with related fields
    const returns = await prisma.return.findMany({
      where: {
        release: {
          modified_on: {
            gte: start,
            lte: end,
          },
        },
      },
      include: {
        return_detail: {
          include: {
            material: {
              include: {
                type: true,
                category: true,
              },
            },
          },
        },
        requestor: true,
        release: {
          select: {
            release_number: true,
            date_out: true,
          },
        },
        modified_by: true,
      },
    });

    return returns;
  } catch (error) {
    throw new Error('Database error while fetching returns');
  }
}

export async function searchReturnByRef(ref: string = '**--**'): Promise<ReturnType[]> {
  try {
    if (isNaN(parseInt(ref))) {
      return [];
    }

    const returns = await prisma.return.findMany({
      where: {
        OR: [{
          return_number: {
            equals: parseInt(ref),
          },
        }, {
          release_number: {
            equals: parseInt(ref),
          },
        }],
      },
      include: {
        requestor: true,
        return_detail: {
          include: {
            material: true,
          },
        },
      },
      take: 10,
      orderBy: {
        return_number: 'asc',
      },
    });

    if (returns && returns.length > 0) {
      const returnsFinal = returns.map((returnType) => ({
        id: returnType.id,
        return_number: returnType.return_number,
        release_number: returnType.release_number,
        requestor: {
          name: returnType.requestor.name,
          employee_no: returnType.requestor.employee_no,
          cost_center_code: returnType.requestor.cost_center_code,
        },
        details: returnType.return_detail.map((detail) => ({
          detail_id: detail.id,
          return_number: detail.return_number,
          desc: detail.material.description, // Assuming material has a 'name' field
          material_id: detail.material.id,
          quantity: detail.quantity,
          cost: detail.material.cost,
          unit: detail.material.unit_of_measure,
          serial_number: detail.material.serial_number,
        })),
        remarks: returnType.remarks,
        tag: returnType.tag,
      }));
        
      return returnsFinal;
    }

    return [];
  } catch (error) {
    throw new Error('Database error');
  }
}