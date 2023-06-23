const catchAsync = require("../utils/catchAsync");
const orderService = require('../service/order')
const sendToken = require('../utils/sendtoken');


const createOrder = catchAsync(async (req,res)=>{
    try {
        
        const employee = "xyz"
        const order = await orderService.createOrder(employee,req.body)
        res.status(201).json({
            success:true,
            order
        })
    } catch (err) {
        console.log(err.status + " " +err.message )
    }
})


module.exports = {
     createOrder
}