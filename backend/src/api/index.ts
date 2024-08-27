import express from 'express';
import user from './user';
import employee from './employee';
import store from './store';
import supplier from './supplier';
import company from './company';
import department from './department';

const router = express.Router();

router.use('/user', user);
router.use('/employee', employee);
router.use('/store', store);
router.use('/supplier', supplier);
router.use('/company', company);
router.use('/department', department);

export default router;
