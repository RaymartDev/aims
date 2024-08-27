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

export async function findCompanyByName(name: string): Promise<Company | null> {
  try {
    const dept = await prisma.company.findFirst({
      where: { name: {
        equals: name,
      } },
    });
    return dept;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchCompanyByName(name: string): Promise<Company[]> {
  try {
    const companies: Company[] = await prisma.company.findMany({
      where: {
        name: {
          startsWith: name,
        },
      },
      take: 10,
      orderBy: {
        name: 'asc',
      },
    });
    return companies;
  } catch (error) {
    throw new Error('Database error');
  }
}