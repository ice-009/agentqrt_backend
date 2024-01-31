const express = require('express');
const { authToken, adminToken } = require('../../../middleware/auth');
const { AdminOrganizationController} = require('../../controller');
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");

const router = express.Router();

router.get(
  '/',
  verifyAccessToken,
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
router.get(
  '/:id',
  verifyAccessToken,
  AdminOrganizationController.getOrgbyId
)


// router.get(
//   '/:orgid',
//   adminToken,
//   AdminOrganizationController.getOrgbyOrgId
// )
router.get(
  '/zone/create/:id',
  adminToken,
  AdminOrganizationController.createZone
)
router.post(
  '/zone/create',
  adminToken,
  AdminOrganizationController.createZonePost
)


module.exports = router;
