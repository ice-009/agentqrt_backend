const { AdminModel } = require("../../model");
const catchAsync = require("../../utils/catchAsync");
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs');
const sendToken = require('../../utils/sendtoken');




const createAdminGet = catchAsync(async (req,res)=>{
    res.render('admin/create_admin.hbs')
})


const createAdminPost = catchAsync(async (req,res)=>{
        
        console.log(req.body)
    
})



module.exports = {
    createAdminGet,
    createAdminPost
}