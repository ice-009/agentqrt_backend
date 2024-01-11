const { AdminModel } = require("../../model");
const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const bcrypt = require('bcryptjs');
// const sendToken = require('../../utils/sendtoken');
const ApiError = require('../../AddtionalFolders/utils/ApiError')
const httpStatus = require("http-status");
const sendTokenWeb = require("../../AddtionalFolders/utils/sendtoken");
const blacklistedTokens = new Set();
// const { verifyaccessToken}
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../../new_auth/jwt_helper');

const login = catchAsync(async (req,res)=>{
    res.render('admin/login.hbs')
})

const loginpost =  catchAsync(async (req,res)=>{
     if (nullChecker(req.body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
     if (nullChecker(req.body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
     const admin = await AdminModel.Admin.findOne({username:req.body.username}).select("+password");
     {
      console.log("checking")
        const adminLogged = await AdminModel.Admin.findOne({username:req.body.username})
      //   sendTokenWeb(admin,200,res)
      const accessToken = await signAccessToken(adminLogged.id);
      const refreshToken = await signRefreshToken(adminLogged.id);
      console.log("access:" ,accessToken)
   //    const accessToken = await signAccessToken(user.id);
   //  const refreshToken = await signRefreshToken(user.id);

res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
});

res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
});
console.log(accessToken);
return res.json(accessToken)
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





