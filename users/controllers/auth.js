const catchAsync = require("../../utils/catchAsync");
// const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs');
// const sendToken = require('../../utils/sendtoken');
const ApiError = require('../../utils/ApiError')
const httpStatus = require("http-status");
// const sendTokenWeb = require("../../utils/sendtoken");
// const blacklistedTokens = new Set();
const {EmployeeModel} =  require('../../model/employee')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../new_auth/jwt_helper');

const login = catchAsync(async (req,res)=>{
    res.render('user/login.hbs')
})
const loginpost = catchAsync(async (req, res) => {
    const { username, password } = req.body;

    if (nullChecker(username, password)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide username and password');
    }

    const user = await EmployeeModel.findOne({ username }).select('+password');

    // Check if the user exists
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid user');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    
    
    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
});

res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
});

return res.redirect(`profile/${user.id}`);

    // return res.json({accessToken,refreshToken})
    // return res.redirect('/profile/:userId')
});

module.exports={
    login,
    loginpost
}