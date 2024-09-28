import { Material } from '@prisma/client';
import prisma from '../../lib/prisma';
import { activeStatus } from '../../lib';

export async function insertMaterial(material: any): Promise<Material | null> {
  try {
    const createMaterial = await prisma.material.create({
      data: {
        ...material,
      },
    });
    return createMaterial;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateMaterial(material: any, id: number): Promise<Material | null> {
  try {
    const updatedMaterial = await prisma.material.update({
      data: {
        ...material,
      },
      where: { id },
    });
    return updatedMaterial;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialById(id: number): Promise<Material | null> {
  try {
    const material = await prisma.material.findUnique({
      where: { id },
    });
    return material;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function deleteMaterialById(id: number): Promise<Material | null> {
  try {
    const material = await prisma.material.update({
      data: {
        deleted: true,
      },
      where: { id },
    });
    return material;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialBySku(material_code: string, item_code: string): Promise<Material | null> {
  try {
    const material = await prisma.material.findFirst({
      where: { 
        material_code: material_code || '',
        item_code: item_code || '',
      },
    });
    return material;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialByName(name: string): Promise<Material | null> {
  try {
    const material = await prisma.material.findFirst({
      where: { description: {
        equals: name,
      } },
    });
    return material;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchMaterialByNameOrCode(material: string = '**--**'): Promise<Material[]> {
  try {
    const materials: Material[] = await prisma.material.findMany({
      where: {
        OR: [
          {
            description: {
              startsWith: material,
            },
          },
          {
            material_code: {
              startsWith: material,
            },
          },
          {
            item_code: {
              startsWith: material,
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        description: 'asc',
      },
    });
    return materials;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface MaterialType {
  id: number;
  item_description: string;
  brand_model: string;
  unit_cost: number;
  category: string;
  material_code: string;
  item_code: string;
  material_con: string;
  material_type: string;
  uom: string;
  date_entry: Date;
}

export async function listMaterials(page: number, limit: number): Promise<{ materialsFinal: MaterialType[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalMaterials = await prisma.material.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalMaterials / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const materials = await prisma.material.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        description: 'asc',
      },
      include: {
        type: true,
        category: true,
      },
      where: {
        deleted: false,
      },
    });

    if (materials && materials.length > 0) {
      const materialsFinal = materials.map((material) => ({
        id: material.id,
        item_description: material.description,
        brand_model: material.brand_model,
        unit_cost: material.cost,
        category: material.category.description,
        material_code: material.material_code,
        item_code: material.item_code,
        material_con: material.material_required_yn,
        material_type: material.type.description,
        uom: material.unit_of_measure,
        date_entry: new Date(material.date_entry),
        active_status: activeStatus(material),
      }));
      return { materialsFinal, maxPage: totalPages };
    }
    
    return { materialsFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}