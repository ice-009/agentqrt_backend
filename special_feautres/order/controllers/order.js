const catchAsync = require("../../../AddtionalFolders/utils/catchAsync");
const orderService = require('../service/order')
const sendToken = require('../../../AddtionalFolders/utils/sendtoken');


const createOrder = catchAsync(async (req,res)=>{
    try {
        
        const employee =req.user.id
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