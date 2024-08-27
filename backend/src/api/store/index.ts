import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create } from 'domain';
import { getOne, update } from './controller';

const router = express.Router();

router.post('/', authenticateToken, create);
router.put('/:id', authenticateToken, update);
router.get('/:id', authenticateToken, getOne);

export default router;