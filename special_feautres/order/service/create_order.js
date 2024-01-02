const httpStatus = require("http-status");
const { nullChecker } = require('../../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../../AddtionalFolders/utils/ApiError');
const Order = require('../../../model/order');

const createOrder = async (employee, orderBody) => {
  console.log(orderBody, employee);

  if (nullChecker(orderBody.quantity))
    throw new ApiError(httpStatus.BAD_REQUEST, 'quantity required');
  if (nullChecker(orderBody.pieceprice))
    throw new ApiError(httpStatus.BAD_REQUEST, 'piece price required');

  // Calculate the amount based on pieceprice * quantity
  const amount = orderBody.pieceprice * orderBody.quantity;

  const orderid = await Order.find().sort({ "orderId": -1 }).limit(1);
  var id;
  if (orderid.length == 0) {
    id = 1;
  } else {
    id = orderid[0].orderId + 1;
  }

  return Order.create({
    orderId: id,
    userId: employee,
    productId: orderBody.productId,
    reason: orderBody.reason,
    quantity: orderBody.quantity,
    pieceprice: orderBody.pieceprice,
    amount: amount, 
    outletId: orderBody.outletId
  });
}

module.exports = createOrder;
