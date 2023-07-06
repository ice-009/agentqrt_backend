const catchAsync = require("../../utils/catchAsync");
const adminOrganizationService = require("../service/organization")


const home = catchAsync(async (req, res) => {
    
    //funtion to getall organization list
    const org = await adminOrganizationService.getAllOrgList()
    res.render("admin/organization", { org: org })
    
})

// const createZone = catchAsync(async (req,res)=>{
//     res.render()
// })

const createOrganization = catchAsync(async (req,res)=>{
    res.render("admin/organization/create.hbs")
})

const createOrganizationPost = catchAsync(async(req,res)=>{

    await adminOrganizationService.createOrg(req.body)

})

const getOrgbyId = catchAsync(async(req,res)=>{
    const org =  await adminOrganizationService.getByOrgId(req.params.id)
    const listzone = await adminOrganizationService.getAllZoneIdAndName(req.params.id)
    res.render('admin/organization/org',{org:org,listzone:listzone})

})


const createZone = catchAsync(async(req,res)=>{
    const org = await adminOrganizationService.getByOrgIdname(req.params.id)
    res.render("admin/organization/crzone.hbs",{org:org})
})


const createZonePost = catchAsync(async(req,res)=>{
    const zone  = await adminOrganizationService.createZone(req.body)
    res.redirect("/admin/organization/"+req.body.orgId)
})


module.exports = {
    home,
    createOrganization,
    createOrganizationPost,
    getOrgbyId,
    createZone,
    createZonePost
}