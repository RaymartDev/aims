import { Material_Type } from '@prisma/client';
import prisma from '../../lib/prisma';
import { activeStatus } from '../../lib';

export async function insertMaterialType(material_type: any): Promise<Material_Type | null> {
  try {
    const createMaterialType = await prisma.material_Type.create({
      data: {
        ...material_type,
      },
    });
    return createMaterialType;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateMaterialType(material_type: any, id: number): Promise<Material_Type | null> {
  try {
    const updatedMaterialType = await prisma.material_Type.update({
      data: {
        ...material_type,
      },
      where: { id },
    });
    return updatedMaterialType;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialTypeById(id: number): Promise<Material_Type | null> {
  try {
    const materialType = await prisma.material_Type.findFirst({
      where: { id },
    });
    return materialType;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function deleteMaterialTypeById(id: number): Promise<Material_Type | null> {
  try {
    const materialType = await prisma.material_Type.delete({
      where: { id },
    });
    return materialType;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialTypeByName(name: string): Promise<Material_Type | null> {
  try {
    const materialType = await prisma.material_Type.findFirst({
      where: { description: {
        equals: name,
      } },
    });
    return materialType;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchMaterialTypeByName(name: string): Promise<Material_Type[]> {
  try {
    const materialTypes: Material_Type[] = await prisma.material_Type.findMany({
      where: {
        description: {
          startsWith: name,
        },
      },
      take: 10,
      orderBy: {
        description: 'asc',
      },
    });
    return materialTypes;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface MaterialTypeInterface {
  id: number;
  description: string;
}

export async function listMaterialTypes(page: number, limit: number): Promise<{ materialTypesFinal: MaterialTypeInterface[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalMaterialTypes = await prisma.material_Type.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalMaterialTypes / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const materialTypes: Material_Type[] = await prisma.material_Type.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        description: 'asc',
      },
      where: {
        deleted: false,
      },
    });
    if (materialTypes && materialTypes.length > 0) {
      const materialTypesFinal = materialTypes.map((materialType) => ({
        id: materialType.id,
        description: materialType.description,
        active_status: activeStatus(materialType),
      }));
      
      return { materialTypesFinal, maxPage: totalPages };
    }
    
    return { materialTypesFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}