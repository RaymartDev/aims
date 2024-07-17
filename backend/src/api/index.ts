import express from 'express';
import employee from './employee';

const router = express.Router();

router.use('/employee', employee);

export default router;
