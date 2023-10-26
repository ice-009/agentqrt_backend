const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');
const ZoneModel =  require('../../../model/zone')
const router = express.Router();

// View form for creating a new zone
router.get('/create', adminToken, AdminZoneController.homeZone);

// Create a new zone
router.post('/create', adminToken, AdminZoneController.createZone);


router.get(
    '/',async (req,res)=>  {try {
      const zones = await ZoneModel.find(); // Retrieve all zones from the database
      res.json(zones); // Send the zones as a JSON response
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve zones' });
    }
  });
  router.get('/:id', async (req, res) => {
    try {
      const zoneId = req.params.id; // Access the :id parameter
      const zone = await ZoneModel.findOne({ zoneId }); // Query the Zone model
  
      if (!zone) {
        // Handle the case where the zone with the specified ID is not found
        return res.status(404).json({ error: 'Zone not found' });
      }
  
      // Respond with the zone information
      res.json(zone);
    } catch (error) {
      // Handle other errors
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
module.exports = router;
