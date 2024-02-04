const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');

const { Outlet } = require("../../model/outlet");
const Order  =  require("../../model/order")

const getOutletPage = async function(id){
    try{
        const outlet = await Outlet.findOne({outletId:id});
        return outlet;
    }
    catch(error){
        throw new ApiError(httpStatus.NOT_FOUND, 'Outlet not found');
    }
}

const orderReportService = async function(id){
    try{
        // const outlet = await Outlet.findOne({outletId:id});
        const order =  await Order.find({outletId:id});
        // console.log("order",order);
        return order;
    }
    catch(error){
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
}

module.exports = {
    getOutletPage,
    orderReportService
}