/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteDeliveryById, findDeliveryById, insertDelivery, listDeliveries, searchDeliveryByReferenceOrDesc, updateDelivery } from './service';
import { findSupplierById } from '../supplier/service';
import { findEmployeeById } from '../employee/service';
import { findStoreById } from '../store/service';
import { findUserTypeByName } from '../user/service';
import { upsertInventoryIncrement } from '../inventory/service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {

    const findSupplier = await findSupplierById(req.body.supplier_id || -1);
    if (!findSupplier) {
      res.status(404).json({ message: 'Supplier not found' });
      return;
    }

    if (req.body.user_type === 'employee') {
      const findEmployee = await findEmployeeById(req.body.requestor_id || -1);
      if (!findEmployee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
    } else {
      const findStore = await findStoreById(req.body.requestor_id || -1);
      if (!findStore) {
        res.status(404).json({ message: 'Store not found' });
        return;
      }
    }
    
    const findUserType = await findUserTypeByName(req.body.user_type || '**-**');
    if (!findUserType) {
      res.status(404).json({ message: `User type ${req.body.user_type} could not be found` });
      return;
    }

    const result = {
      material_id: req.body.material_id,
      remarks: req.body.remarks,
      quantity: req.body.quantity,
      user_id: req.user?.id || 0,
      modified_by_id: req.user?.id || 0,
      supplier_id: req.body.supplier_id,
      requestor_id: req.body.supplier_id,
      user_type_id: findUserType?.id || 0,
      capex_number: req.body.capex_number,
      delivery_receipt_number: req.body.delivery_receipt_number,
      product_order_number: req.body.product_order_number,
      purchase_request_number: req.body.purchase_request_number,
    };

    const newDelivery = await insertDelivery({ ...result });
    const newInventory = await upsertInventoryIncrement({
      material_id: req.body.material_id,
      total_balance: req.body.quantity,
      remaining_balance: req.body.quantity,
      available: req.body.quantity,
      quantity_out: 0,
      return: 0,
      modified_by_id: req.user?.id || 0,
    }, parseInt(req.body.material_id), parseInt(req.body.quantity));
    if (newDelivery && newInventory) {
      res.status(200).json({ delivery: newDelivery, message: 'Successfully created delivery' });
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
      return res.status(400).json({ message: 'Delivery number is required!' });
    }
    const delivery = await findDeliveryById(parseInt(id));
    if (!delivery) {
      return res.status(400).json({ message: 'Delivery not found' });
    }

    res.status(200).json({ delivery, message: 'Successfully found delivery' });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Delivery number is required!' });
    }

    const findDelivery = await findDeliveryById(parseInt(id));
    if (!findDelivery) {
      return res.status(400).json({ message: 'Delivery not found' });
    }

    const newDelivery = await updateDelivery({ modified_by_id: req.user?.id || 1, ...req.body }, parseInt(id));
    if (newDelivery) {
      res.status(200).json({ delivery: newDelivery, message: 'Successfully updated delivery' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const search = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { delivery } = req.query;

    if (!delivery || typeof delivery !== 'string') {
      return res.status(400).json({ error: 'Delivery query parameter is required and must be a string' });
    }
    const deliveries = await searchDeliveryByReferenceOrDesc(delivery as string);
    res.status(200).json({ deliveries, message: 'Successfully found deliveries' });
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

    const deliveries = await listDeliveries(page, limit);
    if (deliveries) {
      res.status(200).json({
        deliveries: deliveries.deliveriesFinal, message: 'Successfully retrieved deliveries', misc: {
          page,
          limit,
          maxPage: deliveries.maxPage || 1,
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
      return res.status(400).json({ message: 'Delivery number is required!' });
    }

    const findDelivery = await findDeliveryById(parseInt(id));
    if (!findDelivery) {
      return res.status(400).json({ message: 'Delivery not found' });
    }

    const deliveryToDelete = await deleteDeliveryById(parseInt(id));
    if (deliveryToDelete) {
      return res.status(200).json({ delivery: deliveryToDelete, message: 'Successfully deleted delivery' });
    }
  } catch (err) {
    next(err);
  }
};

export const toggleActivate = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Delivery number is required!' });
    }

    const findDelivery = await findDeliveryById(parseInt(id));
    if (!findDelivery) {
      return res.status(400).json({ message: 'Delivery not found' });
    }

    const today = new Date();
    const effectiveTo = new Date(findDelivery.effective_to);

    let newEffectiveTo;
    let message;
    if (effectiveTo <= today) {
      // If effective_to is less than or equal to today, set it to 2099-12-31
      newEffectiveTo = new Date('2099-12-31');
      message = 'Successfully activated delivery';
    } else {
      // Otherwise, set it to today's date
      newEffectiveTo = new Date('2019-12-31');
      message = 'Successfully de-activated delivery';
    }

    const newDelivery = await updateDelivery({ modified_by_id: req.user?.id || 1, effective_to: newEffectiveTo }, parseInt(id));

    return res.status(200).json({ delivery: newDelivery, message });
  } catch (err) {
    next(err);
  }
};