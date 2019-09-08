import express from 'express';
const router = express.Router();

import indexRoute from './index.route';
import blockchain from './blockchain.route';

router.use('/', indexRoute);
router.use('/blockchain', blockchain);

export default router;