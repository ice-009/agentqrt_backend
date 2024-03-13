const { AdminModel } = require("../../model");
const catchAsync = require("../../AddtionalFolders/utils/catchAsync");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const bcrypt = require('bcryptjs');
const sendToken = require('../../AddtionalFolders/utils/sendtoken');
const adminuserService = require('../service/user')
const { AllUsers } = require('../../model/all_user')


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
            password: body.password,
            username: req.body.username,
            role: "admin",
            // gender: gender
        })
        // res.redirect("./admin")
        return res.status(200).json({ success: true, message: 'Admin created successfully' });
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
    try {
        // Fetch list of all users
        const users = await adminuserService.getAllUserList();

        // Filter out only the admins and employees and structure the data
        const admins = users.filter(user => user.role === 'admin')
            .map(user => ({
                name: user.username,
                email: user.email,
                username: user.username
            }));

        const employees = users.filter(user => user.role === 'employee')
            .map(user => ({
                name: user.username,
                email: user.email,
                username: user.username
            }));
        console.log("admins", admins)
        console.log("employees", employees)
        // Render the user dashboard page and pass the lists of admins and employees
        res.render("pages/users_dash.ejs", { admins, employees });
    } catch (error) {
        console.error('Error fetching or processing users:', error);
        res.status(500).send('Internal Server Error');
    }
});





module.exports = {
    createAdminGet,
    createAdminPost,
    createEmployeeGet,
    createEmployeePost,
    userhome
}