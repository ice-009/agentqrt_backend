// const catchAsync = require("../../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require('../../../utils/ApiError');
const {Outlet} = require('../../../model/outlet')
const Order = require('../../../model/order');
const createOrder =  require('../service/create_order');
const create_Order = async(req,res)=>{
    try{
        const employee =  req.user.id;

        const orderBody = req.body;

        // const order = await Order.create(orderBody);
        await createOrder(employee, orderBody);

        const outletId = orderBody.outletId;
        // const outlet = await Outlet.findOne({outletId: outletId});
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