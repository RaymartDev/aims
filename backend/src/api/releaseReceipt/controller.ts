import UserRequest from '../../interfaces/UserRequest';
import { Response, NextFunction } from 'express';
import { insertRelease, listReleases } from './service';


export const list = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 17;
    if (isNaN(page) || page < 1) {
      page = 1;
    }
  
    const releases = await listReleases(page, limit);
    if (releases) {
      res.status(200).json({
        releases: releases.releasesFinal, message: 'Successfully retrieved releases', misc: {
          page,
          limit,
          maxPage: releases.maxPage || 1,
        },
      });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};

export const create = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const newRelease = await insertRelease({ modified_by_id: req.user?.id || 1, ...req.body.release }, {
      detail: req.body.release_detail,
    });
    if (newRelease) {
      res.status(200).json({ release: newRelease, message: 'Successfully created release' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  } catch (err) {
    next(err);
  }
};