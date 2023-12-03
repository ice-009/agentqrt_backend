const catchAsync = require("../utils/catchAsync");
const employeeService = require('../service/employee')



const createEmployee = catchAsync(async (req,res)=>{
     const creatorName = "admin"
     const employee = await employeeService.create(creatorName,req.body);
     res.status(201).json({
        success:true,
        employee
     })
})

const editEmployee = catchAsync(async (req,res)=>{
    const employee = await employeeService.edit(req.body.employeeId,req.body,res);
    res.status(200).json({
       success:true,
       msg:"edited successfull",
       employee
    })
})

const deleteEmployee = catchAsync(async (req,res)=>{
    await employeeService.deleteE(req.body.employeeId);
    res.status(200).json({
       success:true,
       msg:"deleted successfull",
    })
})

const salesmenLogin = catchAsync(async (req,res)=>{
    try {
        await employeeService.login(req.body,res)
    } catch (error) {
        console.log(error)
    }
})





module.exports = {
    createEmployee,
    editEmployee,
    deleteEmployee,
    salesmenLogin
}