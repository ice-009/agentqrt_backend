const httpStatus = require("http-status");
const { nullChecker } = require('../../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../../AddtionalFolders/utils/ApiError');
 
const bcrypt = require('bcryptjs');
const sendToken = require('../../../AddtionalFolders/utils/sendtoken');
const Order = require('../../../model/order')





const createOrder = async(employee,orderBody)=>{
     console.log(orderBody,employee)

    if (nullChecker(orderBody.quantity))
      throw new ApiError(httpStatus.BAD_REQUEST, 'quantity required');
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
          quantity:orderBody.quantity,
          pieceprice:orderBody.pieceprice,
          amount:orderBody.amount,
          outletId:orderBody.outletId
    })
    
}



module.exports = {
    createOrder
}