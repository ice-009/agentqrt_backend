const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const ApiError = require('../../utils/ApiError');
const { Organization } = require("../../model/");


 const createOrg = async(body)=>{
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
    if (body.password!=body.cpassword)
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
      orgId:id,
      orgname:body.orgname,
      email:body.email,
      password:body.password,
      username:body.username,
      contactnumber:body.contactnumber,
      address:body.address,
      gstno:body.gstno,
      website:body.website,
      country:body.country,
      pincode:body.pincode,
      yor:body.yor,
      state:body.state,
      contactperson:body.contactperson
   })
 }

 const getAllOrgList = async()=>{
    
    const elem = await Organization.OrganizationModel.find()
    const org = [];
    console.log(elem)
    for (let index = 0; index < elem.length; index++) {
        const element = elem[index];
        console.log(element)
        org.push({
            orgId:element.id,
            orgname:element.orgname,
            email:element.email,
            password:element.password,
            username:element.username,
            contactnumber:element.contactnumber,
            address:element.address,
            gstno:element.gstno,
            website:element.website,
            country:element.country,
            pincode:element.pincode,
            yor:element.yor,
            state:element.state,
            contactperson:element.contactperson
        })
    }

    console.log(org)

    return org


 }

 module.exports = {
    createOrg,
    getAllOrgList
 }