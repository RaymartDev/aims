import express from 'express';
import { authenticateToken } from '../../middlewares';
import { list, getReference, create, ship, receive, search, cancel, searchCompleted, exportData } from './controller';

const router = express.Router();

router.post('/', create, authenticateToken);
router.get('/search', search, authenticateToken);
router.get('/searchActive', searchCompleted, authenticateToken);
router.put('/ship/:id', ship, authenticateToken);
router.get('/export', authenticateToken, exportData);
router.put('/receive/:id', receive, authenticateToken);
router.get('/list', list, authenticateToken);
router.get('/reference', getReference, authenticateToken);
router.put('/cancel/:id', cancel, authenticateToken);


export default router;