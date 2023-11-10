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
  
  router.get(
    '/:id',
    adminToken, async (req,res)=>{
      const id = req.params.id;
      const zonedata = await ZoneModel.findById(id).exec()
      console.log(zonedata)
      // console.log(id)
      const data = await DistributorModel.find({parentzoneid:id}).exec()
      console.log("here is data", data)  
      res.render("admin/Distributor/distributor",{id, data})
    }
    );
module.exports = router;
