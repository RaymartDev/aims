/* eslint-disable @typescript-eslint/naming-convention */
import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { deleteDeliveryById, findDeliveryById, insertDelivery, listDeliveries, searchDeliveryByReferenceOrDesc, updateDelivery } from './service';

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newDelivery = await insertDelivery({ modified_by_id: req.user?.id || 1, ...req.body });
    if (newDelivery) {
      res.status(200).json({ delivery: newDelivery, message: 'Successfully created delivery' });
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
    if (deliveries.length > 0) {
      res.status(200).json({ deliveries, message: 'Successfully found deliveries' });
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

    const deliveries = await listDeliveries(page, limit);
    if (deliveries) {
      res.status(200).json({
        deliveries: deliveries.deliveriesFinal, message: 'Successfully retrieved deliveries', misc: {
          page,
          limit,
          maxPage: deliveries.maxPage || 1,
        },
      });
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