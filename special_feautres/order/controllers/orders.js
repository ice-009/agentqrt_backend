// const catchAsync = require("../../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require('../../../utils/ApiError');

const Order = require('../../../model/order');
const createOrder =  require('../service/create_order');
const create_Order = async(req,res)=>{
    try{
        const employee =  req.user.id;
        const orderBody = req.body;

        // const order = await Order.create(orderBody);
        await createOrder(employee, orderBody);

        res.status(httpStatus.CREATED).send({
            message: 'Order created successfully',
            order: {
                ...orderBody,
                employee
            }
        });
    }catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
    
}

module.exports = {
    create_Order
};