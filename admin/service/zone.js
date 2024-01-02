const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');
const { Zone } = require("../../model/");


// const createDistributor = async(zoneid,body)=>{
//     console.log(body)
// }


// const createWarehouse  = async(zoneid,body)=>{
//     console.log(body)
// }

const getByZoneIdname = async (id) => {

    const element = await Zone.ZoneModel.findOne({ zoneId: id })
    return {
        zoneId: element.zoneId,
        name: element.name,
    }
}



module.exports = {
    getByZoneIdname
}