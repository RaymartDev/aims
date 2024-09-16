/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteStoreById, findStoreByCostCode, findStoreById, insertStore, listStores, searchStoreByCostCode, updateStore } from './service';
import { findCompanyByName } from '../company/service';
import { Store } from '@prisma/client';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const {
      company,
      name,
      cost_center_code,
      address,
    } = req.body;

    const findStore = await findStoreByCostCode(cost_center_code);
    if (findStore) {
      return res.status(401).json({ message: 'Store with cost code already exists' });
    }

    const companyObj = await findCompanyByName(company);
    if (!companyObj) {
      return res.status(401).json({ message: 'Company not found' });
    }

    const newStore = await insertStore({
      company_id: companyObj.id,
      name,
      cost_center_code,
      address,
      registered: false,
      modified_by_id: req.user?.id || 1,
    });
    if (newStore) {
      res.status(200).json({ store: newStore, message: 'Successfully created store' });
    }
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Store ID is required!' });
    }
    const store = await findStoreById(parseInt(id));
    if (!store) {
      return res.status(401).json({ message: 'Store not found!' });
    }

    res.status(200).json({ store, message: 'Successfully found store' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Store ID is required!' });
    }

    const findStore = await findStoreById(parseInt(id));
    if (!findStore) {
      return res.status(401).json({ message: 'Store not found!' });
    }

    const findStoreName = await findStoreByCostCode(req.body.cost_center_code);
    if (findStoreName && findStore.cost_center_code !== req.body.cost_center_code) {
      return res.status(400).json({ message: 'Store with that cost center code already exists!' });
    }

    const updateData: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };

    const { company_name, ...restOfBody } = req.body;

    if (company_name) {
      const findCompany = await findCompanyByName(company_name);
      if (!findCompany) {
        return res.status(400).json({ message: 'Company not found' });
      }
      updateData.company_id = findCompany.id;
    }

    Object.assign(updateData, restOfBody);

    const newStore = await updateStore({ ...updateData }, parseInt(id));

    if (newStore) {
      res.status(200).json({ store: newStore, message: 'Successfully updated store' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { cost_code } = req.query;

    if (!cost_code || typeof cost_code !== 'string') {
      return res.status(400).json({ error: 'Cost code query parameter is required and must be a string' });
    }

    const stores: Store[] = await searchStoreByCostCode(cost_code as string);
    if (stores.length > 0) {
      res.status(200).json({ stores, message: 'Successfully found stores' });
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

    const stores = await listStores(page, limit);
    if (stores) {
      res.status(200).json({
        stores: stores.storesFinal, message: 'Successfully retrieved stores', misc: {
          page,
          limit,
          totalPages: stores.totalPages || 1,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Store ID is required!' });
    }

    const findStore = await findStoreById(parseInt(id));
    if (!findStore) {
      return res.status(400).json({ message: 'Store not found' });
    }

    const storeToDelete = await deleteStoreById(parseInt(id));
    if (storeToDelete) {
      return res.status(200).json({ store: storeToDelete, message: 'Successfully deleted store' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Store ID is required!' });
    }

    const findStore = await findStoreById(parseInt(id));
    if (!findStore) {
      return res.status(400).json({ message: 'Store not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findStore.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated store';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = today;
      message = 'Successfully de-activated store';
    }

    const newStore = await updateStore({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ store: newStore, message });
  } catch (err) {
    next(err);
  }
};