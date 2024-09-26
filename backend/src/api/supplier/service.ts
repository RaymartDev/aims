import { Supplier, Supplier_Contact_Details } from '@prisma/client';
import prisma from '../../lib/prisma';
import { activeStatus } from '../../lib';

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

export async function updateSupplierContact(supplier_contact: any, id: number): Promise<Supplier_Contact_Details | null> {
  try {
    const updatedSupplierContact = await prisma.supplier_Contact_Details.update({
      data: {
        ...supplier_contact,
      },
      where: { id },
    });
    return updatedSupplierContact;
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

export async function deleteSupplierById(id: number): Promise<Supplier | null> {
  try {
    const supplier = await prisma.supplier.delete({
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

export async function searchSupplierByCode(supplier_code: string = '**--**'): Promise<Supplier[]> {
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

interface SupplierType {
  id: number;
  supplier_code: string;
  company_name: string;
  address: string;
  contract_term: string;
  tin_number: string;
  contact_person: string;
  email: string;
  mobile_number: string;
  business_number: string;
  teleFax: string;
  cityTown: string;
  province: string;
  zip: string;
  remarks: string;
}

export async function listSuppliers(page: number, limit: number): Promise<{ suppliersFinal: SupplierType[], maxPage: number }> {
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

    const suppliers = await prisma.supplier.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        supplier_code: 'asc',
      },
      include: {
        contact_details: true,
        company: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deleted: false,
      },
    });

    if (suppliers && suppliers.length > 0) {
      const suppliersFinal = suppliers.map((supplier) => ({
        id: supplier.id,
        supplier_code: supplier.supplier_code,
        company_name: supplier.company.name,
        address: supplier.address,
        contract_term: supplier.contract_term,
        tin_number: supplier.tin_number,
        contact_person: supplier.contact_details.contact_person,
        email: supplier.contact_details.email_address,
        mobile_number: supplier.contact_details.mobile_number,
        business_number: supplier.contact_details.business_tel,
        teleFax: supplier.contact_details.telefax_number,
        cityTown: supplier.contact_details.city_town,
        province: supplier.contact_details.province,
        zip: supplier.contact_details.zip_code,
        remarks: supplier.contact_details.remarks,
        active_status: activeStatus(supplier),
      }));
      return { suppliersFinal, maxPage: totalPages };
    }
    
    return { suppliersFinal: [], maxPage: 1 };
  } catch (error) {
    throw new Error('Database error');
  }
}