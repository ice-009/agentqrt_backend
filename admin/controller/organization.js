const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const adminOrganizationService = require("../service/organization")


const home = catchAsync(async (req, res) => {
    
    //funtion to getall organization list
    const org = await adminOrganizationService.getAllOrgList()
    console.log("first", org)
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

    res.redirect('/admin/organization/')

})

const getOrgbyId = catchAsync(async(req,res)=>{
    const org =  await adminOrganizationService.getByOrgId(req.params.id)
    console.log("org:" ,org)
    const listzone = await adminOrganizationService.getAllZoneIdAndName(req.params.id)
    console.log("lis",listzone)
    const listzone2 = await adminOrganizationService.getAllZoneIdAndName2(req.params.id)
    console.log("lis",listzone2)
    res.render('admin/organization/org',{org:org,listzone:listzone, listzone2:listzone2})

})

// const getOrgbyOrgId =  catchAsync(async(req,res)=>{
//     const org = await adminOrganizationService.getOrgbyOrgId(req.params.id)

// })




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