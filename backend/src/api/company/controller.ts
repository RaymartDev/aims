/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findCompanyById, insertCompany, updateCompany } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newCompany = await insertCompany({ ...req.body });
    res.status(200).json({ company: newCompany, message: 'Successfully created company' });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required!' });
    }
    const company = await findCompanyById(parseInt(id));
    res.status(200).json( { company, message: 'Successfully found company' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required!' });
    }
    const newCompany = await updateCompany({ ...req.body }, parseInt(id));
    res.status(200).json({ company: newCompany, message: 'Successfully updated company' });
  } catch (err) {
    next(err);
  }
};