/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteMaterialCategoryById, findMaterialCategoryById, findMaterialCategoryByName, insertMaterialCategory, listMaterialCategories, searchMaterialCategoryByName, updateMaterialCategory } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const findMaterialCategory = await findMaterialCategoryByName(req.body.description || '');
    if (findMaterialCategory) {
      return res.status(401).json({ material_category: findMaterialCategory, message: 'Material Category with that description already exists' });
    }

    const newMaterialCategory = await insertMaterialCategory({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newMaterialCategory) {
      res.status(200).json({ material_category: newMaterialCategory, message: 'Successfully created material category' });
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
      return res.status(400).json({ message: 'Material Category ID is required!' });
    }
    const material_category = await findMaterialCategoryById(parseInt(id));
    if (!material_category) {
      return res.status(400).json({ message: 'Material Category not found' });
    }

    res.status(200).json({ material_category, message: 'Successfully found material category' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Category ID is required!' });
    }

    const findMaterialCategory = await findMaterialCategoryById(parseInt(id));
    if (!findMaterialCategory) {
      return res.status(400).json({ message: 'Material Category not found' });
    }

    const findMaterialCatName = await findMaterialCategoryByName(req.body.description);
    if (findMaterialCatName && findMaterialCatName.description !== req.body.description) {
      return res.status(400).json({ message: 'Category with that description already exists!' });
    }

    const newMaterialCategory = await updateMaterialCategory({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newMaterialCategory) {
      res.status(200).json({ material_category: newMaterialCategory, message: 'Successfully updated material category' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;

    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Category query parameter is required and must be a string' });
    }
    const materialCategories = await searchMaterialCategoryByName(category as string);
    res.status(200).json({ material_categories: materialCategories, message: 'Successfully found material categories' });
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

    const materialCategories = await listMaterialCategories(page, limit);
    if (materialCategories) {
      res.status(200).json({
        material_categories: materialCategories.materialCategoriesFinal, message: 'Successfully retrieved material categories', misc: {
          page,
          limit,
          maxPage: materialCategories.maxPage || 1,
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
      return res.status(400).json({ message: 'Material Category ID is required!' });
    }

    const findMaterialCategory = await findMaterialCategoryById(parseInt(id));
    if (!findMaterialCategory) {
      return res.status(400).json({ message: 'Material Category not found' });
    }

    const categoryToDelete = await deleteMaterialCategoryById(parseInt(id));
    if (categoryToDelete) {
      return res.status(200).json({ material_category: categoryToDelete, message: 'Successfully deleted material category' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Material Category ID is required!' });
    }

    const findMaterialCategory = await findMaterialCategoryById(parseInt(id));
    if (!findMaterialCategory) {
      return res.status(400).json({ message: 'Material Category not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findMaterialCategory.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated material category';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated material category';
    }

    const newMaterialCategory = await updateMaterialCategory({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ material_category: newMaterialCategory, message });
  } catch (err) {
    next(err);
  }
};