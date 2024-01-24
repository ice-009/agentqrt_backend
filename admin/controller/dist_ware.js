const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const DistWareService = require("../service/dis_ware")
const {DistributorModel} = require("../../model/distributor")    
const mongoose = require('mongoose')
const ZoneModel = require("../../model/zone")
const {AllUsers} = require("../../model/all_user") 

const createDistributor = catchAsync(async(req,res)=>{
     res.render("admin/Distributor/create",{id:req.params.id})
})

const createWarehouse =  catchAsync(async(req,res)=>{
     res.render("admin/warehouse/create",{id:req.params.id})
})

const createDistributor1 = async (req, res) => {
    try {
        // Get the latest distributorId
        const distributorId = await DistributorModel.find().sort({ "distributorId": -1 }).limit(1);

        // Calculate the new distributorId
        const id = distributorId.length === 0 ? 1 : distributorId[0].distributorId + 1;

        // Destructure request body
        const { distributorname, email, password, username, contactnumber, address, gstno, country, pincode, state, contactperson, parentzoneid } = req.body;

        // Convert parentzoneid to ObjectId
        const zoneId = mongoose.Types.ObjectId(parentzoneid);

        // Create a new Distributor instance
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

        // Save the distributor
        const savedDistributor = await distributor.save();

        // Update ZoneModel with the new distributor
        await ZoneModel.findByIdAndUpdate(
            zoneId,
            { $push: { distributor: mongoose.Types.ObjectId(savedDistributor._id) } },
            { new: true }
        );

        // Create a new AllUsers record for the distributor
        await AllUsers.create({
            email: email,
            password: password,
            username: username,
            role: "distributor",
        });

        // Sending a response to the client
        res.redirect("/admin/zone/" + parentzoneid);
    } catch (error) {
        console.error('Error creating distributor:', error);
        res.status(500).send('Internal Server Error');
    }
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