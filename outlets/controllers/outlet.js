const catchAsync = require('../../AddtionalFolders/utils/catchAsync');
const httpStatus = require('http-status');
const outletService = require('../service/outlet');
const sendToken = require('../../AddtionalFolders/utils/sendtoken');
var validator = require("email-validator");


const createOutlet = catchAsync(async (req, res) => {
    try {
        const outlet = await outletService.createOutlet(req.body)
        //   return sendToken(outlet,201,res)
        res.status(201).json({
            success: true,
            outlet
        })
    } catch (errr) {
        console.log(errr.status + errr.message)
    }
})

const loginOutlet = catchAsync(async (req, res) => {
    try {
        const outlet = await outletService.loginOutlet(req.body, res)
        sendToken(outlet, 201, res)
    } catch (errr) {
        console.log(errr.status + errr.message)
    }
})

const resetPassword = catchAsync(async (req, res) => {
    try {
        await outletService.resetPassword(req.user, req.body, res)

    } catch (errr) {
        console.log(errr.status + errr.message)
    }
})

const editOutlet = catchAsync(async (req, res) => {
    try {
        const outlet = await outletService.editOutlet(req.body.erpId, req.body)
        res.status(200).json({
            success: true,
            outlet
        })
    } catch (error) {
        console.log(error.status + " " + error.message)
    }
})


const deleteOutlet = catchAsync(async (req, res) => {
    try {
        await outletService.deleteOutlet(req.body.erpId)
        res.status(200).json({
            success: true,
            msg: "deleted successfull",
        })
    } catch (error) {
        console.log(error.status + " " + error.message)
    }
})

const createActivity = catchAsync(async (req, res) => {
    try {
        // console.log("contr", req.user);
        const activity = await outletService.createActivity(req.body, req.user.id)
        // console.log("contr", req.user);
        res.status(200).json({
            success: true,
            activity
        })
    } catch (error) {
        console.log(error.status + " " + error.message)
    }
})



module.exports = {
    createOutlet,
    loginOutlet,
    resetPassword,
    editOutlet,
    deleteOutlet,
    createActivity
}