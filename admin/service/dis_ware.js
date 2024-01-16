const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');
const { Distributor , Zone ,Warehouse} = require("../../model/");
const ZoneModel =  require("../../model/zone")
const mongoose = require('mongoose')
const WarehouseModel = require("../../model/warehouse")
async function createZone(req, res) {
    try {
      const { name, pincode, district, parentId, distributor, warehouse } = req.body;
  
      const newZone = new ZoneModel({
        name,
        pincode,
        district,
        parentId,
        distributor,
        warehouse,
      });
  
      const savedZone = await newZone.save();
  
      res.status(201).json(savedZone);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


const createDistributor = async(body)=>{
    // zoneId = req.params.zoneId
    // if (nullChecker(body.name))
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'Distributor name required')
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password required')
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    // if (await Distributor.DistributorModel.isUsernameTaken(body.username))
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'username_already_taken')
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

    
        // try {
            // const element = await ZoneModel.findOne({ zoneId: zoneId });
            // if (!element) {
            //   throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
            // }
            // Rest of the code
        //   } catch (error) {
        //     console.error('Error in createDistributor:', error);
        //     throw error; // Re-throw the error to propagate it up the call stack
        //   }
          
        
    // const listdistributor =element.distributor


    // const distributorId = await Distributor.DistributorModel.find().sort({ "distributorId": -1 }).limit(1);

    
    var id;
    if (distributorId.length == 0) {
        id = 1;
    } else {
        id = distributorId[0].distributorId + 1
    }
    console.log(id)
const {distributorId, distributorname, email, password, username, contactnumber, address, gstno, country, pincode, state, contactperson, parentzoneid} = req.body
    const zoneId = mongoose.Types.ObjectId(parentzoneid)
    const distributor = new Distributor.DistributorModel({
        distributorId: id,
        distributorname,
        email,
        password,
        username,
        contactnumber,
        address,
        gstno,
        country,
        pincode,
        state,
        contactperson,
        parentzoneid: zoneId
    })

    const savedDistributor = await distributor.save();
    // const distributor =await Distributor.DistributorModel.create({
    //     distributorId: id,
    //     distributorname: body.name,
    //     email: body.email,
    //     password: body.password,
    //     username: body.username,
    //     contactnumber: body.contactnumber,
    //     address: body.address,
    //     gstno: body.gstno,
    //     country: body.country,
    //     pincode: body.pincode,
    //     state: body.state,
    //     contactperson: body.contactperson,
    //     parentzoneid:body.zoneId
    // })

    await ZoneModel.findByIdAndUpdate(
        zoneId,
        { $push: { distributor: savedDistributor._id } },
        { new: true }
    );

    // Return the created distributor
    return distributor;
  } 
  


const getAllDistributorIdAndName = async(id)=>{
  
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



const createWarehouse = async(zoneid,body)=>{
    console.log(body)
    if (nullChecker(body.name))
        throw new ApiError(httpStatus.BAD_REQUEST, 'Warehouse name required')
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

        const objectId = mongoose.Types.ObjectId(zoneid);
    const element = await ZoneModel.findById( objectId )
    console.log("elemeny", element)
    const listwarehouse =element.warehouse


        const warehouseId = await WarehouseModel.find().sort({ "warehouseId": -1 }).limit(1);
    var id;
    if (warehouseId.length == 0) {
        id = 1;
    } else {
        id = warehouseId[0].warehouseId + 1
    }
    console.log(id)
    const warehouse =await WarehouseModel.create({
        warehouseId: id,
        warehousename: body.name,
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

    const zone = await ZoneModel.findOne(objectId);
    if (zone) {
      zone.warehouse.push(warehouse._id);
      await zone.save();
    } else {
    
      throw new ApiError(httpStatus.NOT_FOUND, 'Zone not found');
    }

    return warehouse;
  }



const getAllWarehouseIdAndName = async(id)=>{
  
    console.log(id)
    const zones= await Zone.ZoneModel.findOne({ zoneId: id })
    const listwarehouse = [];
    for (let index = 0; index <zones.warehouse.length; index++) {
        const element = zones.warehouse[index];
        const warehouse = await Warehouse.WarehouseModel.findOne({warehouseId:element})
        listwarehouse.push(warehouse)
    }
    return listwarehouse
}


module.exports = {
    createDistributor,
    getAllDistributorIdAndName,
    createWarehouse,
    getAllWarehouseIdAndName,
    createZone
}