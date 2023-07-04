const { AdminModel } = require("../../model");
const catchAsync = require("../../utils/catchAsync");
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs');
const sendToken = require('../../utils/sendtoken');
const ApiError = require('../../utils/ApiError')
const httpStatus = require("http-status");

const login = catchAsync(async (req,res)=>{
    res.render('admin/login.hbs')
})

const loginpost =  catchAsync(async (req,res)=>{
     if (nullChecker(req.body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
     if (nullChecker(req.body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
     const admin = await AdminModel.Admin.findOne({username:req.body.username}).select("+password");
     if(!admin)
         res.status(404).json({success:false,message:"invalid user and password"})
     const isPasswordMatched =await bcrypt.compare(req.body.password,admin.password);
     if(!isPasswordMatched){
        res.status(401).json({success:false,message:"Invalid email and password"})
     }else{
        const adminLogged = await AdminModel.Admin.findOne({username:req.body.username})
        sendToken(admin,200,res)
     }
})



module.exports = {
    login,
    loginpost
}





