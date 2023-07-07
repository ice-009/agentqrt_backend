const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { AdminUserController } = require('../../controller');


const router = express.Router();

router.get(
  '/',
  adminToken,
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
