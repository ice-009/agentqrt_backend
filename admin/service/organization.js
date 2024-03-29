const httpStatus = require("http-status");
const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const ApiError = require('../../AddtionalFolders/utils/ApiError');
const { Organization, Zone } = require("../../model/");
const ZoneModel = require("../../model/zone");

const createOrg = async (body) => {
    
    if (nullChecker(body.orgname))
        throw new ApiError(httpStatus.BAD_REQUEST, 'organization name required')
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password required')
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    if (await Organization.OrganizationModel.isUsernameTaken(body.username))
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

    const orgid = await Organization.OrganizationModel.find().sort({ "orgId": -1 }).limit(1);
    var id;
    if (orgid.length == 0) {
        id = 1;
    } else {
        id = orgid[0].orgId + 1
    }
    console.log(id)
    await Organization.OrganizationModel.create({
        orgId: id,
        orgname: body.orgname,
        email: body.email,
        password: body.password,
        username: body.username,
        contactnumber: body.contactnumber,
        address: body.address,
        gstno: body.gstno,
        website: body.website,
        country: body.country,
        pincode: body.pincode,
        yor: body.yor,
        state: body.state,
        contactperson: body.contactperson
    })
}

const getAllOrgList = async () => {

    const elem = await Organization.OrganizationModel.find()
    console.log(elem)
    const org = [];
    console.log(elem)
    for (let index = 0; index < elem.length; index++) {
        const element = elem[index];
        console.log("ele",element)
        
        org.push({
            orgId: element.orgId,
            orgname: element.orgname,
            email: element.email,
            password: element.password,
            username: element.username,
            contactnumber: element.contactnumber,
            address: element.address,
            gstno: element.gstno,
            website: element.website,
            country: element.country,
            pincode: element.pincode,
            yor: element.yor,
            state: element.state,
            contactperson: element.contactperson,
            listZone:element.listzone
        })
    }
    return org

}

const getByOrgId = async (id) => {
    const element = await Organization.OrganizationModel.findOne({ orgId: id })

    return {
        // _id: element.id,
        orgId: element.orgId,
        orgname: element.orgname,
        email: element.email,
        password: element.password,
        username: element.username,
        contactnumber: element.contactnumber,
        address: element.address,
        gstno: element.gstno,
        website: element.website,
        country: element.country,
        pincode: element.pincode,
        yor: element.yor,
        state: element.state,
        contactperson: element.contactperson
    }
}

const getByOrgIdname = async (id) => {

    const element = await Organization.OrganizationModel.findOne({ orgId: id })
    return {
        orgId: element.orgId,
        orgname: element.orgname,
    }
}

const createZone = async (body) => {
    if (nullChecker(body.zonename))
        throw new ApiError(httpStatus.BAD_REQUEST, 'zone name required')
    if (nullChecker(body.orgId))
        throw new ApiError(httpStatus.BAD_REQUEST, 'zone name required')
    const zoneid = await ZoneModel.find().sort({ "zoneId": -1 }).limit(1);
    var id;
    if (zoneid.length == 0) {
        id = 1;
    } else {
        id = zoneid[0].zoneId + 1
    }
    const element = await Organization.OrganizationModel.findOne({ orgId: body.orgId })
    const listZone =element.listzone 
    const zone = await ZoneModel.create({
          zoneId:id,
          name:body.zonename,
          pincode:[body.pincode],
          district:[body.district],
          parentId:body.orgId,
    })
    console.log(listZone)
    listZone.push(zone.zoneId)
    console.log(listZone)
    await Organization.OrganizationModel.findOneAndUpdate({ orgId: body.orgId },{listzone:listZone})
}


const getAllZoneIdAndName = async(id)=>{
    const organization = await Organization.OrganizationModel.findOne({ orgId: id })
    // console.log("organization.listzone", organization.listzone)
    const stringifiedListZone = organization.listzone.map(id => id.toString());
    // const listZone = [];
    // for (let index = 0; index < organization.listzone.length; index++) {
    //     console.log(organization.listzone[index])
    //     const element = organization.listzone[index];
    //     const zone = await ZoneModel.findOne({zoneId:element})
    //     listZone.push(zone)
    // }
    // console.log("str", stringifiedListZone)
    return stringifiedListZone;
}

const getAllZoneIdAndName2 = async (id) => {
    const organization = await Organization.OrganizationModel.findOne({ orgId: id });

    if (!organization) {
        throw new Error('Organization not found');
    }

    // Convert ObjectIDs to strings
    const stringifiedListZone = organization.listzone.map(id => id.toString());

    // Use Promise.all to parallelize the asynchronous operations
    const zonePromises = stringifiedListZone.map(async (element) => {
        const zone = await ZoneModel.findById(element);
        return zone || null; // Return null if zone is not found
    });

    const listZone = await Promise.all(zonePromises);
    console.log("first", listZone)
    return listZone;
};




module.exports = {
    createOrg,
    getAllOrgList,
    getByOrgId,
    createZone,
    getByOrgIdname,
    getAllZoneIdAndName,
    getAllZoneIdAndName2
}