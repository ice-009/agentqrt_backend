const express = require('express');
//const authValidation = require('../validation/authValidation');
// const validator = require('../middlewares/validator');
const { outletController } = require('../../controller');
const { authToken } = require('../../middleware/auth');


const router = express.Router();

router.get('/', (req, res)=>{
  res.send('hello outlets')
})

router.post(
  '/register',
  outletController.createOutlet
)
router.post(
  '/login',
  outletController.loginOutlet
)
router.post(
  '/resetpassword',
  authToken,
  outletController.resetPassword
)
router.post(
  '/edit',
  outletController.editOutlet
)
router.post(
  '/delete',
  outletController.deleteOutlet
)



module.exports = router;
