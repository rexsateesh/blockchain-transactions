import request from 'request';
import HelperService from "../services/helper.service";
import db from '../models';
import moment from 'moment';
import { isNullOrUndefined } from 'util';

export default class BlockchainService extends HelperService {
  /**
   * Pull transactions from Blockchain API
   * @param req express.Request
   * @param res express.Response
   * @returns void;
   */
  pullDataFromBlockchain(req, res) {
    const blockHash = req.query['block_hash']; // Extract Block hash code
    
    // If block has not found then return
    if (isNullOrUndefined(blockHash)) {
      return res.json(this.response(false, 'Invalid block hash'));
    }

    request.get({url: this.generateUrl(blockHash), json: true}, (err, result) => {
      // If request success with 200 status code
      if (result.statusCode === 200) {
        if (result.body.tx.length) {
          result.body.tx.forEach(tx => {
            const {hash, time, weight, size} = tx;
            db.transactions.create({
              hash: hash,
              time: moment.utc(time * 1000),
              weight: weight,
              size: size
            });
          });
        }

        return res.json(this.response(true, 'Transaction fetched', {
          totalTransaction: result.body.tx.length
        }));
      }

      res.json(this.response(false, 'Transactions not found'));
    });
  }

  /**
   * Generate api URL for Blockchain
   * @param blockhash string
   * @returns string
   */
  generateUrl(blockhash) {
    return `https://blockchain.info/rawblock/${blockhash}?cors=true&format=json`;
  }

  /**
   * Fetch transactions from Database
   * @param req express.Request
   * @param res express.Response
   * @returns void
   */
  async getTransactions(req, res) {
    const {sort, order, page, dateFrom, dateTo} = req.query; // sorting
    try {
      const transactions = await db.transactions.findAndCountAll({
        where: {
          time: {
            [db.Sequelize.Op.between]: [new Date(parseInt(dateFrom)), new Date(parseInt(dateTo))]
          }
        },
        attributes: ['id', 'hash', 'time', 'weight', 'size'],
        limit: 10,
        offset: parseInt(page),
        order: [[sort, order]]
      });

      res.json(this.response(true, 'success', transactions));
    } catch(e) {
      res.json(this.response(false, 'failed'));
    }
  }
}