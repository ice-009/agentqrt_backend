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

  // Check if the length of quantity and pieceprice arrays match
  if (orderBody.quantity.length !== orderBody.pieceprice.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Quantity and piece price arrays must have the same length');
  }

  // Calculate the total amount for each product and sum them up
  const amount = orderBody.quantity.reduce((total, quantity, index) => {
    const pieceprice = orderBody.pieceprice[index];
    const productAmount = quantity * pieceprice;
    return total + productAmount;
  }, 0);

  // Calculate the total piece amount
  const pieceAmount = orderBody.quantity.reduce((total, quantity, index) => {
    const pieceprice = orderBody.pieceprice[index];
    const productPieceAmount = quantity * pieceprice;
    return total + productPieceAmount;
  }, 0);

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
    pieceAmount: pieceAmount,
    amount: amount,
    outletId: orderBody.outletId
  });
}

module.exports = createOrder;
