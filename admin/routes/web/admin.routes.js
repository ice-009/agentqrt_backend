const express = require('express');
// const { authToken, adminToken } = require('../../../middleware/auth');
const { adminController,adminauthController, AdminUserController } = require('../../controller');
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");

const router = express.Router();

router.get(
  '/',
  verifyAccessToken,
  adminController.home
)
router.get(
  '/login',
  adminauthController.login
)
router.post(
  '/login',
  adminauthController.loginpost
)
router.post(
  '/logout',
  adminauthController.logout
)
router.get(
  '/create/admin',
  AdminUserController.createAdminGet
)
router.post( 
  '/create/admin',
  AdminUserController.createAdminPost
)


module.exports = router;
