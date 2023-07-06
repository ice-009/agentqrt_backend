const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { AdminZoneController, AdminOrganizationController } = require('../../controller');


const router = express.Router();


router.get(
    '/:id',
    adminToken,
    AdminZoneController.homeZone
)

router.get(
  '/create',
  adminToken,
  AdminZoneController.homeZone
)


module.exports = router;
