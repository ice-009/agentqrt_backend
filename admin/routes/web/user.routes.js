const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { adminController,adminauthController, AdminUserController } = require('../../controller');


const router = express.Router();

router.get(
  '/',
  adminToken,
  AdminUserController.userhome
)

module.exports = router;
