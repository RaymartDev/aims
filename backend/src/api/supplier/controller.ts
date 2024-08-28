/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findSupplierByCode, findSupplierById, insertSupplier, insertSupplierContact, updateSupplier } from './service';
import { findCompanyByName } from '../company/service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      supplier_code,
      status_code,
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

    const effectiveTo = status_code === 2 ? new Date() : new Date('2099-12-01');

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
        effective_to: effectiveTo,
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

    const newSupplier = await updateSupplier({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newSupplier) {
      res.status(200).json({ supplier: newSupplier, message: 'Successfully updated supplier' });
    }
  } catch (err) {
    next(err);
  }
};