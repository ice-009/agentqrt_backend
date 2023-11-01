const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');
const {DistributorModel} = require('../../../model/distributor')

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

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const distributors = await DistributorModel.find({ parentzoneid: id});

    res.status(200).json({ distributors });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
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