import express from 'express';
import { changePassword, login, register } from './controller';
import { authenticateToken } from '../../middlewares';

const router = express.Router();

router.post('/login', login);

// logged in user
router.post('/register', authenticateToken, register);
router.put('/password', authenticateToken, changePassword);

export default router;