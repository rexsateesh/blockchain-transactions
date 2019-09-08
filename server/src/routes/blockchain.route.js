import express from 'express';
const router = express.Router();

import BlockchainService from '../services/blockchain.service';
const blockchainService = new BlockchainService();

router.get('/', (req, res) => blockchainService.getTransactions(req, res))
router.get('/pull-data', (req, res) => blockchainService.pullDataFromBlockchain(req, res));

export default router;