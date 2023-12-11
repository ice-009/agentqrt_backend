const { AdminModel } = require("../../model")
const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const ApiError = require('../../utils/ApiError');
const getBool = require('../../helper/radio')
const {Employee} = require('../../model/')
const {AllUsers} = require('../../model/all_user')
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
    if (body.password != body.cpassword)
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
    if (body.male == 'on') {
        gender = "male"
    } else {
        gender = "female"
    }

    await AdminModel.Admin.create({
        employeeId: id,
        name: body.fullname,
        email: body.email,
        password: body.password,
        username: body.username,
        role: "admin",
        gender: gender
    })
    await AllUsers.create({
        // employeeId: id,
        // name: body.fullname,
        email: body.email,
        // password: body.password,
        username: body.username,
        
        role: "admin",
        // gender: gender
    })
}

const getAllAdminList = async () => {
    const admin = await AdminModel.Admin.find();
    return admin;
}


const createEmployee = async (body) => {
    try{
    if (nullChecker(body.fullname))
        throw new ApiError(httpStatus.BAD_REQUEST, 'fullname required')
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email required')
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password required')
    if (body.password != body.cpassword)
        throw new ApiError(httpStatus.BAD_REQUEST, 'password and confirm password should same')
    if (nullChecker(body.aaadhar))
        throw new ApiError(httpStatus.BAD_REQUEST, 'aadhar required')
    if (nullChecker(body.resaddress))
        throw new ApiError(httpStatus.BAD_REQUEST, 'residential address required')
    if (nullChecker(body.curraddress))
        throw new ApiError(httpStatus.BAD_REQUEST, 'current address required')

        const employeeid = await Employee.EmployeeModel.find().sort({ "employeeId": -1 }).limit(1);
        var id;
        if (employeeid.length == 0) {
            id = 1;
        } else {
            id = employeeid[0].employeeId + 1
        }
        console.log(id)
        await AllUsers.create({
            // employeeId: id,
            // name: body.fullname,
            email: body.email,
            // password: body.password,
            username: body.username,
            role: "employee",
            // gender: gender
        })
        console.log("AllUsers", AllUsers)
    await Employee.EmployeeModel.create({
        employeeId:id,
        fullname: body.fullname,
        username: body.username,
        email: body.email,
        resaddress: body.resaddress,
        curraddress: body.curraddress,
        aaadhar: body.aaadhar,
        pan: body.pan,
        accountno: body.accountno,
        nameinbank: body.nameinbank,
        ifsc: body.ifsc,
        password: body.password,
        role: body.role,
        sale: getBool.getTrueFalse(body.sale),
        collections: getBool.getTrueFalse(body.collections),
        activity: getBool.getTrueFalse(body.activity),
        pop: getBool.getTrueFalse(body.pop),
        bid: getBool.getTrueFalse(body.bid),
        outletEFSCH: getBool.getTrueFalse(body.outletEFSCH),
        assettrack: getBool.getTrueFalse(body.assettrack),
        assetorder: getBool.getTrueFalse(body.assetorder),
        addtask: getBool.getTrueFalse(body.addtask),
        order: getBool.getTrueFalse(body.order),
        printreciept: getBool.getTrueFalse(body.printreciept),
        attendence: getBool.getTrueFalse(body.attendence),
        claims: getBool.getTrueFalse(body.claims),
        activitypicture: getBool.getTrueFalse(body.activitypicture),
        emailretailer: getBool.getTrueFalse(body.emailretailer),
        orderFullfill: getBool.getTrueFalse(body.orderFullfill),
        existingassets: getBool.getTrueFalse(body.existingassets),
        emailpacreport: getBool.getTrueFalse(body.emailpacreport),
        salereturn: getBool.getTrueFalse(body.salereturn),
        captureads: getBool.getTrueFalse(body.captureads),
        attendenceimage: getBool.getTrueFalse(body.attendenceimage),
        genericform: getBool.getTrueFalse(body.genericform),
        activitycomments: getBool.getTrueFalse(body.activitycomments),
        leadmgmtsys: getBool.getTrueFalse(body.leadmgmtsys),
        editoutlet: getBool.getTrueFalse(body.editoutlet),
        reqfordiscount: getBool.getTrueFalse(body.reqfordiscount),
        stockatoutlet: getBool.getTrueFalse(body.stockatoutlet),
        addoutlet: getBool.getTrueFalse(body.addoutlet),
        collateral: getBool.getTrueFalse(body.collateral),
        showoutletageing: getBool.getTrueFalse(body.showoutletageing),
        activityform: getBool.getTrueFalse(body.activityform),
        readgeoloc: getBool.getTrueFalse(body.readgeoloc),
        tasks: getBool.getTrueFalse(body.tasks),
        assetaudit: getBool.getTrueFalse(body.assetaudit),
        shownearestoutlet: getBool.getTrueFalse(body.shownearestoutlet),
        printertype: getBool.getTrueFalse(body.printertype),
        editoutletloc: getBool.getTrueFalse(body.editoutletloc),
        enrollwtarget: getBool.getTrueFalse(body.enrollwtarget),
        stocktransfer: getBool.getTrueFalse(body.stocktransfer),
        taskapprover: getBool.getTrueFalse(body.taskapprover),
        assetderegister: getBool.getTrueFalse(body.assetderegister),
        primaryorder: getBool.getTrueFalse(body.primaryorder),
        entersliceprice: getBool.getTrueFalse(body.entersliceprice),
        sampling: getBool.getTrueFalse(body.sampling),
        primaryactivityform: getBool.getTrueFalse(body.primaryactivityform),
        createeditevent: getBool.getTrueFalse(body.createeditevent),
        assetapprover: getBool.getTrueFalse(body.assetapprover),
        primarysalereturn: getBool.getTrueFalse(body.primarysalereturn),
        edituserlocvis: getBool.getTrueFalse(body.edituserlocvis),
        edituserinfo: getBool.getTrueFalse(body.edituserinfo),
        reporteeview: getBool.getTrueFalse(body.reporteeview),
        secondarygm: getBool.getTrueFalse(body.secondarygm),
        vansalewithorder: getBool.getTrueFalse(body.vansalewithorder),
        primarycollection: getBool.getTrueFalse(body.primarycollection),
        txninsinglescreen: getBool.getTrueFalse(body.txninsinglescreen),
        beatplanning: getBool.getTrueFalse(body.beatplanning),
        trainer: getBool.getTrueFalse(body.trainer),
        claimauditor: getBool.getTrueFalse(body.claimauditor)
    })
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
    catch(error){
        console.log(error)
    }

}
const create_alluser = async (body) => {

    await AllUsers.create({
        // employeeId: id,
        // name: body.fullname,
        email: body.email,
        // password: body.password,
        username: body.username,
        role: body.role,
        // gender: gender
    })

}




module.exports = {
    createAdmin,
    getAllAdminList,
    createEmployee,
    create_alluser
}


