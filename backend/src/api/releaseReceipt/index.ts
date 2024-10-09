import express from 'express';
import { authenticateToken } from '../../middlewares';
import { list, getReference, create, ship, receive, search } from './controller';

const router = express.Router();

router.post('/', create, authenticateToken);
router.get('/search', search, authenticateToken);
router.put('/ship/:id', ship, authenticateToken);
router.put('/receive/:id', receive, authenticateToken);
router.get('/list', list, authenticateToken);
router.get('/reference', getReference, authenticateToken);


export default router;