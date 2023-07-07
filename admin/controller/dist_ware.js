const catchAsync = require("../../utils/catchAsync");
const DistWareService = require("../service/dis_ware")




const createDistributor = catchAsync(async(req,res)=>{
     res.render("admin/Distributor/create",{id:req.params.id})
})

const createWarehouse =  catchAsync(async(req,res)=>{
     res.render("admin/warehouse/create",{id:req.params.id})
})

const createDistributorPost = catchAsync(async(req,res)=>{
     await DistWareService.createDistributor(req.body.zoneId,req.body)
     res.redirect("/admin/zone/"+req.body.zoneId)
})

const createWarehousePost = catchAsync(async(req,res)=>{
     await DistWareService.createWarehouse(req.body.zoneId,req.body)
     res.redirect("/admin/zone/"+req.body.zoneId)
})


module.exports = {
    createDistributor,
    createDistributorPost,
    createWarehouse,
    createWarehousePost
}