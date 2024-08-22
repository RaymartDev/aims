import express from 'express';
import employee from './user';

const router = express.Router();

router.use('/user', employee);

export default router;
