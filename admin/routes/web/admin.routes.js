const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { adminController,adminauthController, AdminUserController } = require('../../controller');


const router = express.Router();

router.get(
  '/',
  adminToken,
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
router.get(
  '/create/admin',
  AdminUserController.createAdminGet
)
router.post( 
  '/create/admin',
  AdminUserController.createAdminPost
)
router.get(
  '/create/employee',
  AdminUserController.createEmployeeGet
)
router.post(
  '/create/employee',
  AdminUserController.createEmployeePost
)

module.exports = router;
