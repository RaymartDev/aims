import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create, exportData, getReference, list, search } from './controller';

const router = express.Router();

router.post('/', create, authenticateToken);
router.get('/list', list, authenticateToken);
router.get('/reference', getReference, authenticateToken);
router.get('/search', search, authenticateToken);
router.get('/export', authenticateToken, exportData);


export default router;