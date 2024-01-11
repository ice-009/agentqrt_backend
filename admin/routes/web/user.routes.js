const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { AdminUserController } = require('../../controller');
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");


const router = express.Router();

router.get(
  '/',
  verifyAccessToken,
  AdminUserController.userhome
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
