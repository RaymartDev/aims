import express from 'express';
import { authenticateToken } from '../../middlewares';
import { getOne, list, search, update, create, deleteOne, toggleActivate } from './controller';

const router = express.Router();

router.post('/', authenticateToken, create);
router.put('/update/:id', authenticateToken, update);
router.get('/get/:id', authenticateToken, getOne);
router.get('/search', authenticateToken, search);
router.get('/list', authenticateToken, list);
router.get('/activate:id', authenticateToken, toggleActivate);
router.delete('/delete:id', authenticateToken, deleteOne);

export default router;