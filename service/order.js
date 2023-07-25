const httpStatus = require("http-status");
const { nullChecker } = require('../helper/nullChecker');
const ApiError = require('../utils/ApiError');

const bcrypt = require('bcryptjs');
const sendToken = require('../utils/sendtoken');
const Order = require('../model/order')





const createOrder = async(employee,orderBody)=>{
     console.log(orderBody)

     if (nullChecker(orderBody.quantityprice))
      throw new ApiError(httpStatus.BAD_REQUEST, 'quantity price required');
    if (nullChecker(orderBody.pieceprice))
      throw new ApiError(httpStatus.BAD_REQUEST, 'piece price_required');
    if (nullChecker(orderBody.amount))
      throw new ApiError(httpStatus.BAD_REQUEST, 'amount_required');
    
    const orderid = await Order.find().sort({"orderId":-1}).limit(1);
    var id;
    if(orderid.length==0){
        id = 1;
    }else{
        id = orderid[0].orderId+1
    }

     
    return Order.create({
          orderId:id,
          userId:employee,
          reason:orderBody.reason,
          quantityprice:orderBody.quantityprice,
          pieceprice:orderBody.pieceprice,
          amount:orderBody.amount,
          outletid:orderBody.outletid
    })
    
}



module.exports = {
    createOrder
}