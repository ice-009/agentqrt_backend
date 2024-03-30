const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');
const { Activity } = require("../../model/activity");
const { Outlet } = require("../../model/outlet");
const Order = require("../../model/order")
const {TargetModel} = require("../../model/targetModel");


const getOutletPage = async function (id) {
    try {
        const outlet = await Outlet.findById(id);
        return outlet;
    }
    catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Outlet not found');
    }
}

const orderReportService = async function (id) {
    try {
        // const outlet = await Outlet.findOne({outletId:id});
        const order = await Order.find({ outletId: id });
        // console.log("order",order);
        return order;
    }
    catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
}

// const createTarget = async function (body, id) {
//     try {
//         return await Target.create({
//             TargetPeriod: body.TargetPeriod,
//             CollectionAmount: body.CollectionAmount,
//             StartDate: body.StartDate,
//             OutletId: id,
//         });
//     }
//     catch (error) {
//         throw new ApiError(httpStatus.BAD_REQUEST, error.message);
//     }
// }

const getActivityService = async function (id) {
    try {
        // const outlet = await Outlet.find({ outletId: id });
        const activity = await Activity.find({ outletId: id });
        return activity;
    }
    catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
    }
}

const createTargetService = async function (body, id) {
    try {
        return await TargetModel.create({
            TargetPeriod: body.TargetPeriod,
            CollectionAmount: body.CollectionAmount,
            StartDate: body.StartDate,
            OutletId: id,
        });
    }
    catch (error) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message);
    }
}

const getTargetService = async function (id) {
    try {
        const target = await TargetModel.find({ OutletId: id });
        return target;
    }
    catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Target not found');
    }
}
const deleteTargetService = async function (id) {
    try {
        const target = await TargetModel.findByIdAndDelete(id);
        return target;
    }   
    catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Target not found');
    }
}

module.exports = {
    getOutletPage,
    orderReportService,
    // createTarget,
    getActivityService,
    createTargetService,
    deleteTargetService,
    getTargetService,
}