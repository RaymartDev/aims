import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create, getOne, list, search, toggleActivate, update } from './controller';

const router = express.Router();

router.post('/', authenticateToken, create);
router.put('/update/:id', authenticateToken, update);
router.get('/get/:id', authenticateToken, getOne);
router.get('/search', authenticateToken, search);
router.get('/list', authenticateToken, list);
router.get('/toggle/:id', authenticateToken, toggleActivate);


export default router;