const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');
const ZoneModel =  require('../../../model/zone')
const router = express.Router();
const {DistributorModel} = require('../../../model/distributor')

// router.get('/create',
// //  adminToken,
//  AdminZoneController.homeZone);

router.post('/create', AdminZoneController.createZone);


router.get(
    '/',async (req,res)=>  {try {
      const zones = await ZoneModel.find(); 
      res.json(zones); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve zones' });
    }
  });
  
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
module.exports = router;
