const catchAsync = require("../../utils/catchAsync");
const adminZoneService = require("../service/zone")
const adminDistWareService = require("../service/dis_ware")


const createDistributor = catchAsync(async(req,res)=>{

     await adminZoneService.createDistributor(req.params.id,req.body)

})

const createWareHouse = catchAsync(async(req,res)=>{

    await adminZoneService.createWarehouse(req.params.id,req.body)
})


const homeZone = catchAsync(async(req,res)=>{
    const zone =await adminZoneService.getByZoneIdname(req.params.id)
    console.log('a')
    const listdistributor = await adminDistWareService.getAllDistributorIdAndName(req.params.id)
    const listwarehouse = await adminDistWareService.getAllWarehouseIdAndName(req.params.id)
    console.log(listwarehouse)

    res.render("admin/zone/zoneopen",{zone:zone,listdistributor:listdistributor,listwarehouse:listwarehouse})
})

module.exports = {
    createDistributor,
    createWareHouse,
    homeZone
}