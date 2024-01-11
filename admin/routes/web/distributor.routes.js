const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');
const {DistributorModel} = require('../../../model/distributor')
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");
const router = express.Router();
// const id = DistributorModel

router.get(
    '/create/:id',
    verifyAccessToken,
    AdminDistWareController.createDistributor
)

router.post(
  '/create',
  verifyAccessToken,
  AdminDistWareController.createDistributorPost
)

router.get('/:id',verifyAccessToken, async (req, res) => {
  const id = req.params.id;

  try {
    const distributors = await DistributorModel.find({ parentzoneid: id});

    res.status(200).json({ distributors });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/',verifyAccessToken, async (req, res) => {
  try{
    const distributors = await DistributorModel.find();
    res.status(200).json({ distributors });
  }
  catch(err){
    res.status(500).json({ error: 'Internal server error' });
    console.log(err)
  }
})



module.exports = router;