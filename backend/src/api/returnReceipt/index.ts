import express from 'express';
import { authenticateToken } from '../../middlewares';
import { create, list } from './controller';

const router = express.Router();

router.post('/', create, authenticateToken);
router.get('/list', list, authenticateToken);


export default router;