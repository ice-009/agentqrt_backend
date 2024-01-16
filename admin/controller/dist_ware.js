const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const DistWareService = require("../service/dis_ware")
const {DistributorModel} = require("../../model/distributor")    
const mongoose = require('mongoose')
const ZoneModel = require("../../model/zone")

const createDistributor = catchAsync(async(req,res)=>{
     res.render("admin/Distributor/create",{id:req.params.id})
})

const createWarehouse =  catchAsync(async(req,res)=>{
     res.render("admin/warehouse/create",{id:req.params.id})
})

const createDistributor1 = async (req, res) => {
     try {
     const distributorId = await DistributorModel.find().sort({ "distributorId": -1 }).limit(1);
 
     let id;
     if (distributorId.length === 0) {
         id = 1;
     } else {
         id = distributorId[0].distributorId + 1;
     }
 
     console.log('id',id);
 
     const { distributorname, email, password, username, contactnumber, address, gstno, country, pincode, state, contactperson, parentzoneid } = req.body;
     const zoneId = mongoose.Types.ObjectId(parentzoneid);
     
      
     console.log('zone',zoneId)
     const distributor = new DistributorModel({
         distributorId: id,
         distributorname,
         email,
         password,
         username,
         contactnumber,
         address,
         gstno,
         country,
         pincode,
         state,
         contactperson,
         parentzoneid: zoneId
     });
 
      const savedDistributor = await distributor.save();
      console.log('dist',savedDistributor)
     const zz = await ZoneModel.findById(zoneId)
     console.log('zz',zz)
     // if (!mongoose.Types.ObjectId.isValid(zoneId) || !mongoose.Types.ObjectId.isValid(savedDistributor._id)) {
     //      return res.status(400).json({ error: 'Invalid ObjectId' });
     //  }

    // ... (your existing code)

    await ZoneModel.findByIdAndUpdate(
        zoneId,
        { $push: { distributor: mongoose.Types.ObjectId(savedDistributor._id) } },
        { new: true }
    );
console.log('pushed successfully')
    // ... (rest of your code)

} catch (error) {
    console.error('Error updating ZoneModel:', error);
    res.status(500).send('Internal Server Error');
}
 
     // Sending a response to the client
     res.redirect("/admin/zone/" + req.body.parentzoneid);
 };
 
 // Using catchAsync if necessary
 const createDistributorPost = catchAsync(createDistributor1);
// const createDistributorPost = catchAsync(async(req,res)=>{
//      await DistWareService.createDistributor(req.body)
//      res.redirect("/admin/zone/"+req.body.zoneId)
// })

const createWarehousePost = catchAsync(async(req,res)=>{
     await DistWareService.createWarehouse(req.body.zoneId,req.body)
    //  res.redirect("/admin/zone/"+req.body.zoneId)
    res.send("done");
})


module.exports = {
    createDistributor,
    createDistributorPost,
    createWarehouse,
    createWarehousePost
}