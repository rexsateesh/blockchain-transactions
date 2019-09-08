import express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
  res.send(helper.response(200, 'OK'));
});

export default router;
