const express = require('express');
const authController = require('../../controller/auth')
const { organizationToken } = require('../../middleware/auth')

const router = express.Router();


router.get(
  '/',
  organizationToken,
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
router.get(
  '/register',
  authController.registerGet
)
router.post(
  '/register',
  authController.registerPost
)



module.exports = router;