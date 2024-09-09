/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findCompanyById, findCompanyByName, insertCompany, listCompanies, searchCompanyByName, updateCompany } from './service';
import { Company } from '@prisma/client';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findCompany = await findCompanyByName(req.body.name);
    if (findCompany) {
      return res.status(200).json({ message: 'Company with that name already exists' });
    }

    const newCompany = await insertCompany({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newCompany) {
      res.status(200).json({ company: newCompany, message: 'Successfully created company' });
    }
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
    if (!company) {
      return res.status(400).json({ message: 'Company not found' });
    }

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

    const findCompany = await findCompanyById(parseInt(id));
    if (!findCompany) {
      return res.status(400).json({ message: 'Company not found' });
    }

    const newCompany = await updateCompany({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newCompany) {
      res.status(200).json({ company: newCompany, message: 'Successfully updated company' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Name query parameter is required and must be a string' });
    }
    const companies: Company[] = await searchCompanyByName(name as string);
    if (companies.length > 0) {
      res.status(200).json({ companies, message: 'Successfully found companies' });
    }
  } catch (err) {
    next(err);
  }
};

export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const companies = await listCompanies(page, limit);
    if (companies) {
      res.status(200).json({ companies: companies.companiesFinal, message: 'Successfully retrieved companies', misc: {
        page,
        limit,
        maxPage: companies.maxPage || 1,
      } });
    }
  } catch (err) {
    next(err);
  }
};