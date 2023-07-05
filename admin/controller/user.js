const { AdminModel } = require("../../model");
const catchAsync = require("../../utils/catchAsync");
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs');
const sendToken = require('../../utils/sendtoken');
const adminuserService = require('../service/user')



const createAdminGet = catchAsync(async (req,res)=>{
    res.render('admin/create_admin.hbs')
})


const createAdminPost = catchAsync(async (req,res)=>{
       
    try {
        await adminuserService.createAdmin(req.body)
        res.redirect("./admin")
    } catch (error) {
        console.log(error.status +" "+error.message )
    }
    
}) 


const createEmployeeGet = catchAsync(async(req,res)=>{

    res.render('admin/create_employee.hbs')

})

const createEmployeePost = catchAsync(async (req,res)=>{
        
    console.log(req.body)

})


const userhome = catchAsync(async(req,res)=>{
    res.render("admin/user")
})




module.exports = {
    createAdminGet,
    createAdminPost,
    createEmployeeGet,
    createEmployeePost,
    userhome
}