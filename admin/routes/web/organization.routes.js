const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const {AdminOrganizationController } = require('../../controller');


const router = express.Router();

router.get(
  '/',
  adminToken,
  AdminOrganizationController.home
)

router.get(
    '/create',
    adminToken,
    AdminOrganizationController.createOrganization 
)
router.post(
  '/create',
  adminToken,
  AdminOrganizationController.createOrganizationPost
)


module.exports = router;
