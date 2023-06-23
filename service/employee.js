const { nullChecker } = require('../helper/nullChecker');
const {EmployeeModel } = require('../model/index');
const ApiError = require('../utils/ApiError');
const httpStatus = require("http-status");

const create = async(createrUsername,employeeBody) =>{
    
    if(nullChecker(employeeBody.name))
        throw new ApiError(httpStatus.BAD_REQUEST,'name required')
    if(nullChecker(employeeBody.email))
        throw new ApiError(httpStatus.BAD_REQUEST,'email required')
    if(nullChecker(employeeBody.password))
        throw new ApiError(httpStatus.BAD_REQUEST,'password required')
    if(nullChecker(employeeBody.username))
        throw new ApiError(httpStatus.BAD_REQUEST,'username required')
    if(nullChecker(employeeBody.dateOfBirth))
        throw new ApiError(httpStatus.BAD_REQUEST,'dateOfBirth required')
    if(nullChecker(employeeBody.gender))
        throw new ApiError(httpStatus.BAD_REQUEST,'gender required')
    if(nullChecker(employeeBody.role))
        throw new ApiError(httpStatus.BAD_REQUEST,'role required')
    if(nullChecker(employeeBody.reportingmanager))
        throw new ApiError(httpStatus.BAD_REQUEST,'reportingmanager required')
        
    const employeeid = await EmployeeModel.Employee.find().sort({"employeeId":-1}).limit(1);
    var id;
    if(employeeid.length==0){
        id = 1;
    }else{
        id = employeeid[0].employeeId+1
    }
   
    return await EmployeeModel.Employee.create({
        "employeeId":id,
        "name":employeeBody.name,
        "email":employeeBody.email,
        "password":employeeBody.password,
        "username":employeeBody.username,
        "phonenumber":employeeBody.phonenumber,
        "dateOfBirth":employeeBody.dateOfBirth,
        "gender":employeeBody.gender,
        "dp":employeeBody.dp,
        "address":employeeBody.address,
        "imie":employeeBody.imie,
        "role":employeeBody.role,
        "for":employeeBody.for,
        "hierarchy":employeeBody.hierarchy,
        "logindetail":employeeBody.logindetail,
        "reportingmanager":employeeBody.reportingmanager,
        "createdBy":createrUsername
    })
}


const edit = async(employeeid,employeeBody,res) => {
     if(nullChecker(employeeid))
        throw new ApiError(httpStatus.BAD_REQUEST,'employeeId required')

     await EmployeeModel.Employee.findOneAndUpdate({"employeeId":employeeid},{
        "name":employeeBody.name,
        "email":employeeBody.email,
        "password":employeeBody.password,
        "username":employeeBody.username,
        "phonenumber":employeeBody.phonenumber, 
        "dateOfBirth":employeeBody.dateOfBirth,
        "gender":employeeBody.gender,
        "dp":employeeBody.dp,
        "address":employeeBody.address,
        "imie":employeeBody.imie,
        "role":employeeBody.role,
        "for":employeeBody.for,
        "hierarchy":employeeBody.hierarchy,
        "logindetail":employeeBody.logindetail,
        "reportingmanager":employeeBody.reportingmanager,
        // "createdBy":createrUsername
     })

    return await EmployeeModel.Employee.findOne({"employeeId":employeeid})
}

 
const deleteE = async(employeeId) =>{
     const employee = await EmployeeModel.Employee.findOne({"employeeId":employeeId})
     await EmployeeModel.Employeedel.create({
        "employeeId":employee.employeeId,
        "name":employee.name,
        "email":employee.email,
        "password":employee.password,
        "username":employee.username,
        "phonenumber":employee.phonenumber,
        "dateOfBirth":employee.dateOfBirth,
        "gender":employee.gender,
        "dp":employee.dp,
        "address":employee.address,
        "imie":employee.imie,
        "role":employee.role,
        "for":employee.for,
        "hierarchy":employee.hierarchy,
        "logindetail":employee.logindetail,
        "reportingmanager":employee.reportingmanager,
        "createdBy":employee.createdBy
     })
     await EmployeeModel.Employee.findOneAndDelete({"employeeId":employeeId})
}


module.exports = {
    create,
    edit,
    deleteE
}