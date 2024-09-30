/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteCompanyById, findCompanyById, findCompanyByName, insertCompany, listCompanies, searchCompanyByName, updateCompany } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findCompany = await findCompanyByName(req.body.name);
    if (findCompany) {
      return res.status(200).json({ message: 'Company with that name already exists' });
    }

    const newCompany = await insertCompany({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newCompany) {
      res.status(200).json({ company: newCompany, message: 'Successfully created company' });
    } else {
      res.status(500).json({ message: 'Server error' });
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

    res.status(200).json({ company, message: 'Successfully found company' });
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required!' });
    }

    const findCompany = await findCompanyById(parseInt(id));
    if (!findCompany) {
      return res.status(400).json({ message: 'Company not found' });
    }

    const companyToDelete = await deleteCompanyById(parseInt(id));
    if (companyToDelete) {
      return res.status(200).json({ company: companyToDelete, message: 'Successfully deleted company' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Company ID is required!' });
    }

    const findCompany = await findCompanyById(parseInt(id));
    if (!findCompany) {
      return res.status(400).json({ message: 'Company not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findCompany.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated company';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated company';
    }

    const newCompany = await updateCompany({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ company: newCompany, message });
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

    const findCompanyName = await findCompanyByName(req.body.name || '');
    if (findCompanyName && findCompany.name !== req.body.name) {
      return res.status(400).json({ message: 'Company name already exists!' });
    }

    const newCompany = await updateCompany({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newCompany) {
      res.status(200).json({ company: newCompany, message: 'Successfully updated company' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { company } = req.query;

    if (!company || typeof company !== 'string') {
      return res.status(400).json({ error: 'Company query parameter is required and must be a string' });
    }
    const companies = await searchCompanyByName(company);
    res.status(200).json({ companies, message: 'Successfully searched' });
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
      res.status(200).json({
        companies: companies.companiesFinal, message: 'Successfully retrieved companies', misc: {
          page,
          limit,
          maxPage: companies.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};