import { Supplier, Supplier_Contact_Details } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function insertSupplier(supplier: any): Promise<Supplier | null> {
  try {
    const createSupplier = await prisma.supplier.create({
      data: {
        ...supplier,
      },
    });
    return createSupplier;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function insertSupplierContact(supplier_details: any): Promise<Supplier_Contact_Details | null> {
  try {
    const createSupplierDetails = await prisma.supplier_Contact_Details.create({
      data: {
        ...supplier_details,
      },
    });
    return createSupplierDetails;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function updateSupplier(supplier: any, id: number): Promise<Supplier | null> {
  try {
    const updatedSupplier = await prisma.supplier.update({
      data: {
        ...supplier,
      },
      where: { id },
    });
    return updatedSupplier;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findSupplierById(id: number): Promise<Supplier | null> {
  try {
    const supplier = await prisma.supplier.findFirst({
      where: { id },
    });
    return supplier;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function findSupplierByCode(supplier_code: string): Promise<Supplier | null> {
  try {
    const supplier = await prisma.supplier.findFirst({
      where: { supplier_code },
    });
    return supplier;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function searchSupplierByName(supplier_code: string): Promise<Supplier[]> {
  try {
    const suppliers: Supplier[] = await prisma.supplier.findMany({
      where: {
        supplier_code: {
          startsWith: supplier_code,
        },
      },
      take: 10,
      orderBy: {
        supplier_code: 'asc',
      },
    });
    return suppliers;
  } catch (error) {
    throw new Error('Database error');
  }
}

export async function listSuppliers(page: number, limit: number): Promise<Supplier[]> {
  try {
    // Get total count for pagination
    const totalSuppliers = await prisma.supplier.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalSuppliers / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    const suppliers: Supplier[] = await prisma.supplier.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        supplier_code: 'asc',
      },
    });
    
    return suppliers;
  } catch (error) {
    throw new Error('Database error');
  }
}