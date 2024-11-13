/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteMaterialById, findMaterialById, findMaterialBySku, insertMaterial, listMaterials, searchMaterialByNameOrCode, updateMaterial } from './service';
import { findMaterialCategoryByName } from '../materialCategory/service';
import { findMaterialTypeByName } from '../materialType/service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findMaterial = await findMaterialBySku(req.body.material_code || '', req.body.item_code || '');
    if (findMaterial) {
      return res.status(400).json({ message: 'Material with that material and item code already exists' });
    }
    const { category, type, ...restOfBody } = req.body;
    const updateData: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };

    if (!category || !type) {
      return res.status(400).json({ message: 'Material category or type is not specified' });
    }

    const findCategory = await findMaterialCategoryByName(category);
    const findType = await findMaterialTypeByName(type);

    updateData.category_id = findCategory?.id || 1;
    updateData.type_id = findType?.id || 1;

    Object.assign(updateData, restOfBody);

    const newMaterial = await insertMaterial({ ...updateData }, req.user?.id || 1);
    if (newMaterial) {
      res.status(200).json({ material: newMaterial, message: 'Successfully created material' });
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
      return res.status(400).json({ message: 'Material ID is required!' });
    }
    const material = await findMaterialById(parseInt(id));
    if (!material) {
      return res.status(400).json({ message: 'Material could not be found!' });
    }
    res.status(200).json({ material, message: 'Successfully found material' });
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

    const findSku = await findMaterialBySku(req.body.material_code, req.body.item_code);
    if (findSku && `${findMaterial.item_code}${findMaterial.material_code}` !== `${req.body.material_code}${req.body.item_code}`) {
      return res.status(400).json({ message: 'Material with that item and material code already exists!' });
    }

    const { category, type, ...restOfBody } = req.body;
    const updateData: Record<string, any> = {
      modified_by_id: req.user?.id || 1, // Always include the user ID
    };

    if (!category || !type) {
      return res.status(400).json({ message: 'Material category or type is not specified' });
    }

    const findCategory = await findMaterialCategoryByName(category);
    const findType = await findMaterialTypeByName(type);

    updateData.category_id = findCategory?.id || 1;
    updateData.type_id = findType?.id || 1;

    Object.assign(updateData, restOfBody);

    const newMaterial = await updateMaterial({ ...updateData }, parseInt(id));
    if (newMaterial) {
      res.status(200).json({ material: newMaterial, message: 'Successfully updated material' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { material } = req.query;

    if (!material || typeof material !== 'string') {
      return res.status(400).json({ error: 'Name query parameter is required and must be a string' });
    }

    const materials = await searchMaterialByNameOrCode(material as string);
    res.status(200).json({ materials, message: 'Successfully found materials' });
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

    const materials = await listMaterials(page, limit);
    if (materials) {
      res.status(200).json({
        materials: materials.materialsFinal, message: 'Successfully retrieved materials', misc: {
          page,
          limit,
          maxPage: materials.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteOne = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material ID is required!' });
    }

    const findMaterial = await findMaterialById(parseInt(id));
    if (!findMaterial) {
      return res.status(400).json({ message: 'Material not found' });
    }

    const materialToDelete = await deleteMaterialById(parseInt(id));
    if (materialToDelete) {
      return res.status(200).json({ material: materialToDelete, message: 'Successfully deleted material' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material ID is required!' });
    }

    const findMaterial = await findMaterialById(parseInt(id));
    if (!findMaterial) {
      return res.status(400).json({ message: 'Material not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findMaterial.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated material';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated material';
    }

    const newMaterial = await updateMaterial({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ material: newMaterial, message });
  } catch (err) {
    next(err);
  }
};