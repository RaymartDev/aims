import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create } from 'domain';
import { getOne, search, update } from './controller';

const router = express.Router();

router.post('/', authenticateToken, create);
router.put('/:id', authenticateToken, update);
router.get('/:id', authenticateToken, getOne);
router.get('/search', authenticateToken, search);

export default router;