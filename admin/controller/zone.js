const catchAsync = require("../../utils/catchAsync");
const adminZoneService = require("../service/zone")

const createDistributor = catchAsync(async(req,res)=>{

     await adminZoneService.createDistributor(req.params.id,req.body)

})

const createWareHouse = catchAsync(async(req,res)=>{

    await adminZoneService.createWarehouse(req.params.id,req.body)
})


const homeZone = catchAsync(async(req,res)=>{
    const zone =await adminZoneService.getByZoneIdname(req.params.id)
    res.render("admin/zone/zoneopen",{zone:zone})
})

module.exports = {
    createDistributor,
    createWareHouse,
    homeZone
}