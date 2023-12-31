const express = require('express');
// const authValidation = require('../validation/authValidation');
// const validator = require('../../middleware/validator');
const { employeeController } = require('../../../controller');
const { authToken } = require('../../../middleware/auth');
const router = express.Router();

router.get('/create', authToken,(req,res)=>{
  res.json('hello');
})
router.post(
  '/create',
  // validator(authValidation.register),
  // authToken,
  employeeController.createEmployee
);
router.post(
  '/edit',
  employeeController.editEmployee
) 
router.post(
  '/delete',
  employeeController.deleteEmployee
)
// router.post(
//   '/salesmen/login',
//   employeeController.salesmenLogin
// );
// // router.post(
//   '/forgot-password',
//   authController.forgotPassword
// );
// router.post(
//   '/password/rest',
//   authToken,
//   authController.resetPassword
// )
// router.get(
//   '/getprofile',
//   authToken,
//   authController.getProfile
// )
// router.post(
//   '/editprofile',
//   authToken,
//   authController.editProfile
// )
// router.post(
//   '/upload/dp',
//   authToken,
//   authController.uploadDp
// )
// router.get(
//   '/lookup',
//   authController.hostlookup
// )



// // router.post(
// //   '/reset-password',
// //   validator(authValidation.resetPassword),abkmupeastabkmupeast
// //   authController.resetPassword
// // );

module.exports = router;
