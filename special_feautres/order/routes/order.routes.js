const express = require('express');
const {orderController } = require('../../../controller');
const { authToken } = require('../../../middleware/auth');


const router = express.Router();

router.post(
  '/create',
  authToken,
  orderController.createOrder
)





module.exports = router;
