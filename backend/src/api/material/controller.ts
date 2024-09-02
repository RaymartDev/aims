/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { Material } from '@prisma/client';
import { findMaterialById, findMaterialByName, insertMaterial, listMaterials, searchMaterialByName, updateMaterial } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findMaterial = await findMaterialByName(req.body.department || '');
    if (findMaterial) {
      return res.status(400).json({ message: 'Material with that description already exists' });
    }
    const newMaterial = await insertMaterial({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newMaterial) {
      res.status(200).json({ department: newMaterial, message: 'Successfully created material' });
    }
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material ID is required!' });
    }
    const material = await findMaterialById(parseInt(id));
    if (!material) {
      return res.status(400).json({ message: 'Material could not be found!' });
    }
    res.status(200).json( { material, message: 'Successfully found material' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material ID is required!' });
    }
    const findMaterial = await findMaterialById(parseInt(id));
    if (!findMaterial) {
      return res.status(400).json({ message: 'Material could not be found!' });
    }

    const newMaterial = await updateMaterial({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newMaterial) {
      res.status(200).json({ department: newMaterial, message: 'Successfully updated material' });
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

    const materials: Material[] = await searchMaterialByName(name as string);
    if (materials.length > 0) {
      res.status(200).json({ materials, message: 'Successfully found materials' });
    }
  } catch (err) {
    next(err);
  }
};


export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const materials: Material[] = await listMaterials(page, 10);
    if (materials) {
      res.status(200).json({ materials, message: 'Successfully retrieved materials' });
    }
  } catch (err) {
    next(err);
  }
};