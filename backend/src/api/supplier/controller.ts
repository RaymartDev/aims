/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findSupplierByCode, findSupplierById, insertSupplier, insertSupplierContact, listSuppliers, searchSupplierByName, updateSupplier, updateSupplierContact } from './service';
import { findCompanyByName } from '../company/service';
import { Supplier } from '@prisma/client';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      supplier_code,
      company,
      address,
      contract_term,
      tin_number,
      contact_person,
      email_address,
      mobile_number,
      business_tel,
      telefax_number,
      city_town,
      province,
      zip_code,
      remarks,
    } = req.body;

    const findSupplier = await findSupplierByCode(supplier_code);
    if (findSupplier) {
      return res.status(400).json({ message: 'Supplier with this code already exists' });
    }

    const findCompany = await findCompanyByName(company);
    if (!findCompany) {
      return res.status(400).json({ message: 'Company not found!' });
    }

    const newSupplierDetails = await insertSupplierContact({
      contact_person,
      email_address,
      mobile_number,
      business_tel,
      telefax_number,
      city_town,
      province,
      zip_code,
      remarks,
      modified_by_id: req.user?.id || 1,
    });

    if (newSupplierDetails) {
      const newSupplier = await insertSupplier({ 
        supplier_code,
        company_id: findCompany.id,
        address,
        contract_term,
        tin_number,
        contact_id: newSupplierDetails.id,
        modified_by_id: req.user?.id || 1,
      });

      if (newSupplier) {
        res.status(200).json({ supplier: newSupplier, contact_details: newSupplierDetails, message: 'Successfully created supplier' });
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Supplier ID is required!' });
    }
    const supplier = await findSupplierById(parseInt(id));
    if (!supplier) {
      return res.status(401).json({ message: 'Supplier not found!' });
    }

    res.status(200).json( { supplier, message: 'Successfully found supplier' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Supplier ID is required!' });
    }
    const findSupplier = await findSupplierById(parseInt(id));
    if (!findSupplier) {
      return res.status(401).json({ message: 'Supplier not found!' });
    }

    const updateData: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };

    if (req.body.company_name) {
      const findCompany = await findCompanyByName(req.body.company_name);
      if (!findCompany) {
        return res.status(400).json({ message: 'Company not found' });
      }
      updateData.company_id = findCompany.id;
    }
    updateData.address = req.body.address || '';
    updateData.contract_term = req.body.contract_term || '';
    updateData.tin_number = req.body.tin_number || '';

    const newSupplier = await updateSupplier({ ...updateData }, parseInt(id));

    const updateContact: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };
    updateContact.contact_person = req.body.contact_person || '';
    updateContact.business_tel = req.body.business_tel || '';
    updateContact.email_address = req.body.email_address || '';
    updateContact.telefax_number = req.body.telefax_number || '';
    updateContact.zip_code = req.body.zip_code || '';
    updateContact.mobile_number = req.body.mobile_number || '';
    updateContact.city_town = req.body.city_town || '';
    updateContact.province = req.body.province || '';
    updateContact.remarks = req.body.remarks || '';

    const newSupplierContact = await updateSupplierContact({ ...updateContact }, newSupplier?.contact_id || 1);
    if (newSupplier) {
      res.status(200).json({ supplier: newSupplier, supplierContact: newSupplierContact, message: 'Successfully updated supplier' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { supplier_code } = req.query;
    
    if (!supplier_code || typeof supplier_code !== 'string') {
      return res.status(400).json({ error: 'Cost code query parameter is required and must be a string' });
    }

    const suppliers: Supplier[] = await searchSupplierByName(supplier_code as string);
    if (suppliers.length > 0) {
      res.status(200).json({ suppliers, message: 'Successfully found suppliers' });
    }
  } catch (err) {
    next(err);
  }
};

export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const suppliers = await listSuppliers(page, limit);
    if (suppliers) {
      res.status(200).json({ suppliers: suppliers.suppliersFinal, message: 'Successfully retrieved suppliers', misc: {
        page,
        limit,
        maxPage: suppliers.maxPage || 1,
      } });
    }
  } catch (err) {
    next(err);
  }
};