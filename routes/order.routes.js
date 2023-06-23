const express = require('express');
const {orderController } = require('../controller');
const { authToken } = require('../middleware/auth');


const router = express.Router();

router.post(
  '/create',
  orderController.createOrder
)

// router.post(
//   '/login',
//   outletController.loginOutlet
// )
// router.post(
//   '/resetpassword',
//   authToken,
//   outletController.resetPassword
// );

// router.post(
//   '/password/rest',
//   authToken,
//   authController.resetPassword
// )



module.exports = router;
