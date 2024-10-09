import { Release } from '@prisma/client';
import prisma from '../../lib/prisma';

interface DetailedRelease {
  detail: any[];
}

export async function insertRelease(release: any, detail: DetailedRelease): Promise<Release | null> {
  try {
    const createdRelease = await prisma.release.create({
      data: {
        ...release,
      },
    });
    if (createdRelease && detail.detail.length > 0) {
      const releaseDetails = detail.detail.map(item => ({
        ...item,
        release_number: createdRelease.release_number,
      }));

      await prisma.release_Detail.createMany({
        data: releaseDetails,
      });
    }
    return createdRelease;
  } catch (error) {
    throw new Error('Database error');
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
          date: release.release_shipped.supplied_date,
        } : null,
        received_by: release.release_receiver ? {
          name: release.release_receiver.name,
          date: release.release_receiver.receive_date,
        } : null,
        status: release.status,
        details: release.release_detail.map(detail => ({
          release_number: detail.release_number,
          desc: detail.material.description, // Assuming material has a 'name' field
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