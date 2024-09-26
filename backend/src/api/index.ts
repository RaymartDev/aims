import express from 'express';
import user from './user';
import employee from './employee';
import store from './store';
import supplier from './supplier';
import company from './company';
import material from './material';
import department from './department';
import materialCategory from './materialCategory';
import materialType from './materialType';
import inventory from './inventory';
import delivery from './delivery';
import releaseReceipt from './releaseReceipt';
import returnReceipt from './returnReceipt';

const router = express.Router();

router.use('/user', user);
router.use('/employee', employee);
router.use('/store', store);
router.use('/supplier', supplier);
router.use('/company', company);
router.use('/department', department);
router.use('/material', material);
router.use('/material-type', materialType);
router.use('/material-category', materialCategory);

// inventory routes
router.use('/inventory', inventory);
router.use('/delivery', delivery);
router.use('/release-receipt', releaseReceipt);
router.use('/return-receipt', returnReceipt);

export default router;
