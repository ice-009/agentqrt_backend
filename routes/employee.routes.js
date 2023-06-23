const express = require('express');
//const authValidation = require('../validation/authValidation');
// const validator = require('../middlewares/validator');
const { employeeController } = require('../controller');
const { authToken } = require('../middleware/auth');
const router = express.Router();










// const express = require('express');
// //const authValidation = require('../validation/authValidation');
// // const validator = require('../middlewares/validator');
// const { authController } = require('../controller');
// const { uploadDp } = require('../controller/authController');
// const { authToken } = require('../middlewares/auth');



router.post(
  '/create',
  //validator(authValidation.register),
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
//   '/login',
//   authController.loginUser
// );
// router.post(
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
// //   validator(authValidation.resetPassword),
// //   authController.resetPassword
// // );

module.exports = router;
