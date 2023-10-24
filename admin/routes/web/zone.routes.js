const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');

const router = express.Router();

// View form for creating a new zone
router.get('/create', adminToken, AdminZoneController.homeZone);

// Create a new zone
router.post('/create', adminToken, AdminZoneController.createZone);

module.exports = router;
