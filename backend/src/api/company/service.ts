import { Company } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertCompany(company: any): Promise<Company | null> {
  try {
    const createCompany = await prisma.company.create({
      data: {
        ...company,
      },
    });
    return createCompany;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateCompany(company: any, id: number): Promise<Company | null> {
  try {
    const updatedCompany = await prisma.company.update({
      data: {
        ...company,
      },
      where: { id },
    });
    return updatedCompany;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findCompanyById(id: number): Promise<Company | null> {
  try {
    const company = await prisma.company.findFirst({
      where: { id },
    });
    return company;
  } catch (error) {
    throw new Error('Database error');
  }
}