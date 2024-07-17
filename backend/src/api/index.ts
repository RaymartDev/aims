import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import employee from './employee';

const router = express.Router();

router.get<{}, MessageResponse>('/employee', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/employee', employee);

export default router;
