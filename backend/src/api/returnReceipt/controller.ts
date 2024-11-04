import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { getReferenceNumber, insertReturn, listReturns } from './service';
import { findUserById } from '../user/service';

export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    
    const returns = await listReturns(page, limit);
    if (returns) {
      res.status(200).json({
        returns: returns.returnsFinal, message: 'Successfully retrieved returns', misc: {
          page,
          limit,
          maxPage: returns.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const getReference = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const reference = await getReferenceNumber();
    res.status(200).json({ reference });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const findUser = await findUserById(Number(req.body.assigned_id));
  
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' });
    }
      
    const newReturn = await insertReturn({ ...req.body.return }, {
      detail: req.body.return_detail,
    }, findUser.id);
    if (newReturn) {
      res.status(200).json({ return: newReturn, message: 'Successfully created return' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};