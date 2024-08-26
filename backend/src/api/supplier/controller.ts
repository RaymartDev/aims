/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findSupplierById, insertSupplier, updateSupplier } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newSupplier = await insertSupplier({ ...req.body });
    res.status(200).json({ store: newSupplier, message: 'Successfully created supplier' });
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
    const newSupplier = await updateSupplier({ ...req.body }, parseInt(id));
    res.status(200).json({ supplier: newSupplier, message: 'Successfully updated supplier' });
  } catch (err) {
    next(err);
  }
};