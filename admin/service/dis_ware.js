const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const ApiError = require('../../utils/ApiError');
const { Distributor , Zone} = require("../../model/");



const createDistributor = async(zoneid,body)=>{
    console.log(body)
    if (nullChecker(body.name))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Distributor name required')
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password required')
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    if (await Distributor.DistributorModel.isUsernameTaken(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_already_taken')
    if (body.password != body.cpassword)
        throw new ApiError(httpStatus.BAD_REQUEST, 'password and confirm password should same')
    if (nullChecker(body.contactnumber))
        throw new ApiError(httpStatus.BAD_REQUEST, 'contactnumber required')
    if (nullChecker(body.contactperson))
        throw new ApiError(httpStatus.BAD_REQUEST, 'contactperson required')
    if (nullChecker(body.address))
        throw new ApiError(httpStatus.BAD_REQUEST, 'address required')
    if (nullChecker(body.pincode))
        throw new ApiError(httpStatus.BAD_REQUEST, 'pincode required')
    if (nullChecker(body.gstno))
        throw new ApiError(httpStatus.BAD_REQUEST, 'gstno required')
    if (nullChecker(body.state))
        throw new ApiError(httpStatus.BAD_REQUEST, 'state required')

    
    const element = await Zone.ZoneModel.findOne({ zoneId:zoneid })
    const listdistributor =element.distributor


    const distributorId = await Distributor.DistributorModel.find().sort({ "distributorId": -1 }).limit(1);
    var id;
    if (distributorId.length == 0) {
        id = 1;
    } else {
        id = distributorId[0].distributorId + 1
    }
    console.log(id)
    const distributor =await Distributor.DistributorModel.create({
        distributorId: id,
        distributorname: body.name,
        email: body.email,
        password: body.password,
        username: body.username,
        contactnumber: body.contactnumber,
        address: body.address,
        gstno: body.gstno,
        country: body.country,
        pincode: body.pincode,
        state: body.state,
        contactperson: body.contactperson,
        parentzoneid:body.zoneId
    })

    console.log(listdistributor)
    listdistributor.push(distributor.distributorId)
    console.log(listdistributor)

    await Zone.ZoneModel.findOneAndUpdate({ zoneId:zoneid },{distributor:listdistributor})
}


const getAllDistributorIdAndName = async(id)=>{
  
    console.log(id)
    const zones= await Zone.ZoneModel.findOne({ zoneId: id })
    const listdistributor = [];
    console.log('get')
    for (let index = 0; index <zones.distributor.length; index++) {
        console.log('get')
        const element = zones.distributor[index];
        const distributor = await Distributor.DistributorModel.findOne({distributorId:element})
        listdistributor.push(distributor)
    }
    return listdistributor
}


module.exports = {
    createDistributor,
    getAllDistributorIdAndName
}