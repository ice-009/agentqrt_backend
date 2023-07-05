const { AdminModel } = require("../../model")
const httpStatus = require("http-status");
const { nullChecker } = require('../../helper/nullChecker');
const ApiError = require('../../utils/ApiError');

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





module.exports = {
    createAdmin
}