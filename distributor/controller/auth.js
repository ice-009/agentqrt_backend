const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const authService = require('../service/auth')

const loginGet = catchAsync(async(req,res)=>{
    res.render("distributor/login")
}) 

const loginPost = catchAsync(async(req,res)=>{
    const user =await authService.login(req.body,res)
    
}) 


const home = catchAsync(async(req,res)=>{
    res.render("distributor/")
})


module.exports = {
    loginGet,
    home,
    loginPost
}