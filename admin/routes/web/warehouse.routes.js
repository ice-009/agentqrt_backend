const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');
const WarehouseModel = require('../../../model/warehouse.js')
const ZoneModel =  require('../../../model/zone')
const router = express.Router();
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");

router.get(
    '/create/:id',
    verifyAccessToken,
    AdminDistWareController.createWarehouse
)

router.post(
  '/create',
  verifyAccessToken,
  AdminDistWareController.createWarehousePost
)


router.get('/:id', verifyAccessToken, async (req, res) => {
  const id = req.params.id;

  try {
    const warehouses = await WarehouseModel.find({ parentzoneid: id });

    res.status(200).json({ warehouses });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try{
    const warehouses = await WarehouseModel.find();
    res.status(200).json({ warehouses });
  }
  catch(err){
    res.status(500).json({ error: 'Internal server error' });
    console.log(err)
  }
})


module.exports = router;