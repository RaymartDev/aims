import express from 'express';
import { authenticateToken } from '../../middlewares';

const router = express.Router();

router.post('/', authenticateToken);
router.put('/update/:id', authenticateToken);
router.get('/get/:id', authenticateToken);
router.get('/search', authenticateToken);
router.get('/list', authenticateToken);
router.get('/activate/:id', authenticateToken);
router.delete('/delete/:id', authenticateToken);


export default router;