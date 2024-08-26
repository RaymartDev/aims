/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findStoreById, insertStore, updateStore } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newStore = await insertStore({ ...req.body });
    res.status(200).json({ store: newStore, message: 'Successfully created store' });
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
    const newStore = await updateStore({ ...req.body }, parseInt(id));
    res.status(200).json({ store: newStore, message: 'Successfully updated store' });
  } catch (err) {
    next(err);
  }
};