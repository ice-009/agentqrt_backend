const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');
const ZoneModel =  require('../../../model/zone')
const router = express.Router();

router.get('/create', adminToken, AdminZoneController.homeZone);

router.post('/create', adminToken, AdminZoneController.createZone);


router.get(
    '/',async (req,res)=>  {try {
      const zones = await ZoneModel.find(); 
      res.json(zones); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve zones' });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const zoneId = req.params.id; 
      const zone = await ZoneModel.findOne({ zoneId }); 
  
      if (!zone) {
        return res.status(404).json({ error: 'Zone not found' });
      }

      res.json(zone);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;
