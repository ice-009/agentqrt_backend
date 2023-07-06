const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');


const router = express.Router();

router.get(
    '/create/:id',
    adminToken,
    AdminDistWareController.createDistributor
)

router.post(
  '/create',
  adminToken,
  AdminDistWareController.createDistributorPost
)

module.exports = router;