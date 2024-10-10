import express from 'express';
import { authenticateToken } from '../../middlewares';
import { list } from './controller';

const router = express.Router();

router.post('/', authenticateToken);
router.get('/list', list, authenticateToken);


export default router;