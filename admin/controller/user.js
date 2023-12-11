const { AdminModel } = require("../../model");
const catchAsync = require("../../utils/catchAsync");
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs');
const sendToken = require('../../utils/sendtoken');
const adminuserService = require('../service/user')
const {AllUsers} = require('../../model/all_user')


const createAdminGet = catchAsync(async (req, res) => {
    res.render('admin/create_admin.hbs')
})


const createAdminPost = catchAsync(async (req, res) => {

    try {
        await adminuserService.createAdmin(req.body)
        await AllUsers.create({
            // employeeId: id,
            // name: body.fullname,
            email: req.body.email,
            // password: body.password,
            username: req.body.username,
            role: "admin",
            // gender: gender
        })
        res.redirect("./admin")
    } catch (error) {
        console.log(error.status + " " + error.message)
    }

})


const createEmployeeGet = catchAsync(async (req, res) => {

    res.render('admin/user/create_employee.hbs')

})

const createEmployeePost = catchAsync(async (req, res) => {
    
    await adminuserService.createEmployee(req.body)
    res.redirect("/admin/user")

})


const userhome = catchAsync(async (req, res) => {
    var admin;
    var listAdmin = [];
    admin = await adminuserService.getAllAdminList();
    for (let index = 0; index < admin.length; index++) {
        const element = admin[index];
        if(element.role=='admin'){
            listAdmin.push({
                name: element.name,
                email: element.email,
                username: element.username,
            })
        }
        
    }
    res.render("admin/user",{listadmin:listAdmin})
})




module.exports = {
    createAdminGet,
    createAdminPost,
    createEmployeeGet,
    createEmployeePost,
    userhome
}