const { AdminModel } = require("../../model")
const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const ApiError = require('../../utils/ApiError');
const getBool = require('../../helper/radio')

const createAdmin = async (body) => {
    console.log(body)


    if (nullChecker(body.fullname))
        throw new ApiError(httpStatus.BAD_REQUEST, 'fullname required')
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password required')
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    if (body.password!=body.cpassword)
        throw new ApiError(httpStatus.BAD_REQUEST, 'password and confirm password should same')
    // if (await AdminModel.Admin.isUsernameTaken(body.username))
    //     throw new ApiError(httpStatus.BAD_REQUEST, 'username_already_taken')

    const employeeid = await AdminModel.Admin.find().sort({ "employeeId": -1 }).limit(1);
    var id;
    if (employeeid.length == 0) {
        id = 1;
    } else {
        id = employeeid[0].employeeId + 1
    }

    var gender;
    if(body.male=='on'){
        gender ="male"
    }else{
        gender="female"
    }

    await AdminModel.Admin.create({
        employeeId: id,
        name: body.fullname,
        email: body.email,
        password: body.password,
        username: body.username,
        role: "admin",
        gender:gender
    })
}

const getAllAdminList = async()=>{
    const admin = await AdminModel.Admin.find();
    return admin;
}


const createEmployee = async(body)=>{
    // console.log(body)
    console.log(getBool.getTrueFalse(body.activity))
//     fullname: 'employee1',
//   username: 'employee1',
//   email: 'employee1',
//   resaddress: 'employee1',
//   curraddress: 'employee1',
//   aaadhar: 'employee1',
//   pan: 'employee1',
//   accountno: 'employee1',
//   nameinbank: 'employee1',
//   ifsc: 'employee1',
//   password: 'employee1',
//   cpassword: 'employee1',
//   role: 'Zonal Manager',
//   sale: 'on',
//   collections: 'on',
//   activity: 'on',
//   pop: 'on',
//   bid: 'on',
//   outletEFSCH: 'on',
//   assettrack: 'on',
//   assetorder: 'on',
//   addtask: 'on',
//   order: 'on',
//   printreciept: 'on',
//   attendence: 'on',
//   claims: 'on',
//   activitypicture: 'on',
//   emailretailer: 'on',
//   orderFullfill: 'on',
//   existingassets: 'on',
//   emailpacreport: 'on',
//   salereturn: 'on',
//   captureads: 'on',
//   attendenceimage: 'on',
//   genericform: 'on',
//   activitycomments: 'on',
//   leadmgmtsys: 'on',
//   editoutlet: 'on',
//   reqfordiscount: 'on',
//   stockatoutlet: 'on',
//   addoutlet: 'on',
//   collateral: 'on',
//   showoutletageing: 'on',
//   activityform: 'on',
//   readgeoloc: 'on',
//   tasks: 'on',
//   assetaudit: 'on',
//   shownearestoutlet: 'on',
//   printertype: 'on',
//   editoutletloc: 'on',
//   enrollwtarget: 'on',
//   stocktransfer: 'on',
//   taskapprover: 'on',
//   assetderegister: 'on',
//   primaryorder: 'on',
//   entersliceprice: 'on',
//   sampling: 'on',
//   primaryactivityform: 'on',
//   createeditevent: 'on',
//   assetapprover: 'on',
//   primarysalereturn: 'on',
//   edituserlocvis: 'on',
//   edituserinfo: 'on',
//   reporteeview: 'on',
//   secondarygm: 'on',
//   vansalewithorder: 'on',
//   primarycollection: 'on',
//   txninsinglescreen: 'on',
//   beatplanning: 'on',
//   trainer: 'on',
//   claimauditor: 'on'

}




module.exports = {
    createAdmin,
    getAllAdminList,
    createEmployee
}


