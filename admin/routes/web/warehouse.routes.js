const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const {AdminDistWareController } = require('../../controller');
const WarehouseModel = require('../../../model/warehouse.js')
const ZoneModel =  require('../../../model/zone')
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


router.get('/:id', async (req, res) => {
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