const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const reportController = require('../../controller/report')


const router = express.Router();

router.get(
  '/sales',
  reportController.reportget
)
router.get(
  '/save',
  reportController.reportPost
)
router.get(
  '/download',
  reportController.reportExport
)




module.exports = router;
