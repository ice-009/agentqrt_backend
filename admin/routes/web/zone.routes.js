const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');


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