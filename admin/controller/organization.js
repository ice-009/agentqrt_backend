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



module.exports = {
    home,
    createOrganization,
    createOrganizationPost
}