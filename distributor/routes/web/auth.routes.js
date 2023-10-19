const express = require('express');
const authController = require('../../controller/auth')
const { distributorToken } = require('../../middleware/auth')

const router = express.Router();


router.get(
  '/',
  distributorToken,
  authController.home
)
router.post(
    '/login',
    authController.loginPost
)

router.get(
    '/login',
    authController.loginGet
)



module.exports = router;