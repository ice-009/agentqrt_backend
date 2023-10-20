const catchAsync = require("../../utils/catchAsync");
const authService = require('../service/auth')

const loginGet = catchAsync(async(req,res)=>{
    res.render("organization/login")
}) 

const loginPost = catchAsync(async(req,res)=>{
    const user = await authService.login(req.body,res)
    
}) 


const home = catchAsync(async(req,res)=>{
    res.render("organization/")
})


module.exports = {
    loginGet,
    home,
    loginPost
}