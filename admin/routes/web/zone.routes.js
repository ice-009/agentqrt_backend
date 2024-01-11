const express = require('express');
const { adminToken } = require('../../../middleware/auth');
const { AdminZoneController } = require('../../controller');
const ZoneModel =  require('../../../model/zone')
const router = express.Router();
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");

const {DistributorModel} = require('../../../model/distributor')
const {Outlet} = require('../../../model/outlet')
// router.get('/create',
// //  adminToken,
//  AdminZoneController.homeZone);

router.post('/create',  AdminZoneController.createZone);


router.get(
    '/',verifyAccessToken,async (req,res)=>  {try {
      const zones = await ZoneModel.find(); 
      res.json(zones); 
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve zones' });
    }
  });
  
  router.get('/:id', verifyAccessToken, async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the zone
      const zoneData = await ZoneModel.findById(id).exec();
      if (!zoneData) {
        return res.status(404).send('Zone not found');
      }
  
      // Find distributors for the specified zone
      const distributors = await DistributorModel.find({ parentzoneid: id }).exec();
  
      // Iterate through distributors and retrieve outlet information
      const distributorData = [];
      for (const distributor of distributors) {
        const outletIds = distributor.outlets; // Assuming outlets is an array of outlet IDs
  
        // Find outlet information using outlet IDs
        const outlets = await Outlet.find({ _id: { $in: outletIds } }).exec();
  
        // Push data to distributorData array
        distributorData.push({
          distributor: distributor,
          outlets: outlets,
        });
      }
  
      console.log('Distributor Data:', distributorData);
      console.log(distributorData.outlets)
      res.render('admin/Distributor/distributor', { id, distributorData });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
module.exports = router;
