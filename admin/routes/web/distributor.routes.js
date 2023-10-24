const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');


const router = express.Router();
router.get(
  '/',(req,res)=>{
  adminToken,
  res.send('hello')}
)
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