/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { findInventoryById, insertInventory, listInventories, searchInventory, updateInventory } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newInventory = await insertInventory({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newInventory) {
      res.status(200).json({ inventory: newInventory, message: 'Successfully created inventory' });
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
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }
    const inventory = await findInventoryById(parseInt(id));
    if (!inventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ inventory, message: 'Successfully found inventory' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }

    const findInventory = await findInventoryById(parseInt(id));
    if (!findInventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    const newInventory = await updateInventory({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newInventory) {
      res.status(200).json({ inventory: newInventory, message: 'Successfully updated inventory' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { inventory } = req.query;

    if (!inventory || typeof inventory !== 'string') {
      return res.status(400).json({ error: 'Inventory query parameter is required and must be a string' });
    }
    const inventories = await searchInventory(inventory as string);
    res.status(200).json({ inventories, message: 'Successfully found inventories' });
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

    const inventories = await listInventories(page, limit);
    if (inventories) {
      res.status(200).json({
        inventories: inventories.inventoriesFinal, message: 'Successfully retrieved inventories', misc: {
          page,
          limit,
          maxPage: inventories.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Inventory ID is required!' });
    }

    const findInventory = await findInventoryById(parseInt(id));
    if (!findInventory) {
      return res.status(400).json({ message: 'Inventory not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findInventory.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated inventory';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated inventory';
    }

    const newInventory = await updateInventory({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ inventory: newInventory, message });
  } catch (err) {
    next(err);
  }
};