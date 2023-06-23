const express = require('express');
const { authToken } = require('../middleware/auth');
const { adminController } = require('../admin/controller');


const router = express.Router();

router.get(
  '/',
  adminController.home
)

module.exports = router;
