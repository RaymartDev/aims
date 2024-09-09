import { Material } from '@prisma/client';
import prisma from '../../lib/prisma';

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
    const material = await prisma.material.findFirst({
      where: { id },
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

export async function searchMaterialByName(name: string): Promise<Material[]> {
  try {
    const materials: Material[] = await prisma.material.findMany({
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
    return materials;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function listMaterials(page: number, limit: number): Promise<Material[]> {
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

    const materials: Material[] = await prisma.material.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        description: 'asc',
      },
    });
    
    return materials;
  } catch (error) {
    throw new Error('Database error');
  }
}