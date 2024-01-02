const express = require('express');
const authController = require('../../controller/auth')
const { organizationToken } = require('../../middleware/auth')
// const OrganizationModel = require('../../../model/organization')
const {OrganizationModel} = require("../../../model/organization");
const ZoneModel = require('../../../model/zone')
const router = express.Router();
const {DistributorModel} = require('../../../model/distributor')


router.get(
  '/',
  organizationToken,
  authController.home
)
router.post(
    '/login',
    authController.loginPost
)

router.get(
    '/login',
    authController.loginGet
)
router.get(
  '/register',
  authController.registerGet
)
router.post(
  '/register',
  authController.registerPost
)

router.get('/getallorg', async (req, res) => {
  try {
    console.log('Populating organizations...');
const organizations = await OrganizationModel
  .find()
  .populate({
    path: 'listzone',
    select: 'zoneName',
  })
  .exec();
console.log('Organizations after population:', organizations);

    return res.render('organization/getallorg', { organizations });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;