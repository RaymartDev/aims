/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findStoreByCostCode, findStoreById, insertStore, searchStoreByCostCode, updateStore } from './service';
import { findCompanyByName } from '../company/service';
import { Store } from '@prisma/client';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { 
      company,
      store,
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
      store,
      cost_center_code,
      address,
      registered: 0,
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

    res.status(200).json( { store, message: 'Successfully found store' });
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

    const newStore = await updateStore({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    
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