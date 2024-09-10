import { Material_Category } from '@prisma/client';
import prisma from '../../lib/prisma';
import { activeStatus } from '../../lib';

export async function insertMaterialCategory(material_category: any): Promise<Material_Category | null> {
  try {
    const createMaterialCategory = await prisma.material_Category.create({
      data: {
        ...material_category,
      },
    });
    return createMaterialCategory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateMaterialCategory(material_category: any, id: number): Promise<Material_Category | null> {
  try {
    const updatedMaterialCategory = await prisma.material_Category.update({
      data: {
        ...material_category,
      },
      where: { id },
    });
    return updatedMaterialCategory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialCategoryById(id: number): Promise<Material_Category | null> {
  try {
    const materialCategory = await prisma.material_Category.findUniqueOrThrow({
      where: { id },
    });
    return materialCategory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function deleteMaterialCategoryById(id: number): Promise<Material_Category | null> {
  try {
    const materialCategory = await prisma.material_Category.delete({
      where: { id },
    });
    return materialCategory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findMaterialCategoryByName(description: string): Promise<Material_Category | null> {
  try {
    const materialCategory = await prisma.material_Category.findFirst({
      where: { description: {
        equals: description,
      } } });
    
    console.log(materialCategory);
    return materialCategory;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchMaterialCategoryByName(name: string): Promise<Material_Category[]> {
  try {
    const materialCategories: Material_Category[] = await prisma.material_Category.findMany({
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
    return materialCategories;
  } catch (error) {
    throw new Error('Database error');
  }
}

interface MaterialCategoryInterface {
  id: number;
  description: string;
}

export async function listMaterialCategories(page: number, limit: number): Promise<{ materialCategoriesFinal: MaterialCategoryInterface[], maxPage: number }> {
  try {
    // Get total count for pagination
    const totalMaterialCategories = await prisma.material_Category.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalMaterialCategories / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const materialCategories = await prisma.material_Category.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        description: 'asc',
      },
    });
    if (materialCategories && materialCategories.length > 0) {
      const materialCategoriesFinal = materialCategories.map((materialCategory) => ({
        id: materialCategory.id,
        description: materialCategory.description,
        active_status: activeStatus(materialCategory),
      }));
      
      return { materialCategoriesFinal, maxPage: totalPages };
    }
    
    return { materialCategoriesFinal: [], maxPage: totalPages };
  } catch (error) {
    throw new Error('Database error');
  }
}