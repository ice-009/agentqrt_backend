const { AdminModel } = require("../../model");
const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const bcrypt = require('bcryptjs');
// const sendToken = require('../../utils/sendtoken');
const ApiError = require('../../AddtionalFolders/utils/ApiError')
const httpStatus = require("http-status");
const sendTokenWeb = require("../../AddtionalFolders/utils/sendtoken");
const blacklistedTokens = new Set();

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
        sendTokenWeb(admin,200,res)
     }
     if (blacklistedTokens.has(req.body.token)) {
      res.status(401).json({ success: false, message: 'Token is blacklisted. Please log in again.' });
    } else {
      sendTokenWeb(admin, 200, res);
    }
})
const logout = catchAsync(async (req, res) => {
   const token = req.body.token; // Assuming you pass the token to invalidate in the request body
   if (token) {
     blacklistedTokens.add(token);
     res.status(200).json({ success: true, message: 'Logged out successfully' });
   } else {
     res.status(400).json({ success: false, message: 'Token not provided' });
   }
 });
 


module.exports = {
    login,
    loginpost,
    logout
}





