const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');

const { Outlet } = require("../../model/outlet");

const getOutletPage = async function(id){
    try{
        const outlet = await Outlet.findOne({outletId:id});
        return outlet;
    }
    catch(error){
        throw new ApiError(httpStatus.NOT_FOUND, 'Outlet not found');
    }
}

module.exports = {
    getOutletPage
}