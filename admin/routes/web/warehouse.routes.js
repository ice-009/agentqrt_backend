const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');


const router = express.Router();

router.get(
    '/create/:id',
    adminToken,
    AdminDistWareController.createWarehouse
)

router.post(
  '/create',
  adminToken,
  AdminDistWareController.createWarehousePost
)

module.exports = router;