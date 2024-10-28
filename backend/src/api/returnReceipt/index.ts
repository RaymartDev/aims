import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create, getReference, list } from './controller';

const router = express.Router();

router.post('/', create, authenticateToken);
router.get('/list', list, authenticateToken);
router.get('/reference', getReference, authenticateToken);


export default router;