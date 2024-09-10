/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteMaterialTypeById, findMaterialTypeById, findMaterialTypeByName, insertMaterialType, listMaterialTypes, searchMaterialTypeByName, updateMaterialType } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findMaterialType = await findMaterialTypeByName(req.body.description);
    if (findMaterialType) {
      return res.status(200).json({ message: 'Material Type with that description already exists' });
    }

    const newMaterialType = await insertMaterialType({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newMaterialType) {
      res.status(200).json({ materialType: newMaterialType, message: 'Successfully created material type' });
    }
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Type ID is required!' });
    }
    const materialType = await findMaterialTypeById(parseInt(id));
    if (!materialType) {
      return res.status(400).json({ message: 'Material Type not found' });
    }

    res.status(200).json( { materialType, message: 'Successfully found department' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Type ID is required!' });
    }

    const findMaterialType = await findMaterialTypeById(parseInt(id));
    if (!findMaterialType) {
      return res.status(400).json({ message: 'Material Type not found' });
    }

    const findMaterialTypeDesc = await findMaterialTypeByName(req.body.description);
    if (findMaterialTypeDesc) {
      return res.status(400).json({ message: 'Type with that description already exists!' });
    }

    const newMaterialType = await updateMaterialType({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newMaterialType) {
      res.status(200).json({ materialType: newMaterialType, message: 'Successfully updated department' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { desc } = req.query;

    if (!desc || typeof desc !== 'string') {
      return res.status(400).json({ error: 'Desc query parameter is required and must be a string' });
    }
    const materialTypes = await searchMaterialTypeByName(desc as string);
    if (materialTypes.length > 0) {
      res.status(200).json({ materialTypes, message: 'Successfully found material types' });
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

    const materialTypes = await listMaterialTypes(page, limit);
    if (materialTypes) {
      res.status(200).json({ materialTypes: materialTypes.materialTypesFinal, message: 'Successfully retrieved material types', misc: {
        page,
        limit,
        maxPage: materialTypes.maxPage || 1,
      } });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Type ID is required!' });
    }

    const findMaterialType = await findMaterialTypeById(parseInt(id));
    if (!findMaterialType) {
      return res.status(400).json({ message: 'Material Type not found' });
    }

    const typeToDelete = await deleteMaterialTypeById(parseInt(id));
    if (typeToDelete) {
      return res.status(200).json({ material_type: typeToDelete, message: 'Successfully deleted material type' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Type ID is required!' });
    }

    const findMaterialType = await findMaterialTypeById(parseInt(id));
    if (!findMaterialType) {
      return res.status(400).json({ message: 'Material Type not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findMaterialType.effective_to);
    
    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated material type';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = today;
      message = 'Successfully de-activated material type';
    }

    const newMaterialType = await updateMaterialType({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ material_type: newMaterialType, message });
  } catch (err) {
    next(err);
  }
};