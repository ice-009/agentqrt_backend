const { nullChecker } = require('../../AddtionalFolders/helper/nullChecker');
const {EmployeeModel } = require('../../model/employee')
const ApiError = require('../../AddtionalFolders/utils/ApiError');
const httpStatus = require("http-status");
const bcrypt = require('bcryptjs')
const sendToken = require('../../AddtionalFolders/utils/sendtoken')

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
        
    const employeeid = await EmployeeModel.find().sort({"employeeId":-1}).limit(1);
    var id;
    if(employeeid.length==0){
        id = 1;
    }else{
        id = employeeid[0].employeeId+1
    }
   
    return await EmployeeModel.create({
        "employeeId":id,
        "name":employeeBody.name,
        "email":employeeBody.email,
        "password":employeeBody.password,
        "username":employeeBody.username,
        "phonenumber":employeeBody.phonenumber,
        "dateOfBirth":employeeBody.dateOfBirth,
        "gender":employeeBody.gender,
        "aadhar":employeeBody.aadhar,
        "pan":employeeBody.pan,
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

     await EmployeeModel.findOneAndUpdate({"employeeId":employeeid},{
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

    return await EmployeeModel.findOne({"employeeId":employeeid})
}

 
const deleteE = async(employeeId) =>{
     const employee = await EmployeeModel.findOne({"employeeId":employeeId})
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
     await EmployeeModel.findOneAndDelete({"employeeId":employeeId})
}

const login = async(body,res)=>{
    if (nullChecker(body.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email_required')
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required')
    const salesmen = await EmployeeModel.findOne({email:body.email}).select("+password");
    if(!salesmen)
        res.status(404).json({success:false,message:"invalid email and password"})
    const isPasswordMatched =await bcrypt.compare(body.password,salesmen.password);
    if(!isPasswordMatched){res.status(401).json({success:false,message:"Invalid email and password"})
    }else{
        const salesmenLogged = await EmployeeModel.findOne({email:body.email})
        // console.log(salesmenLogged)
      sendToken(salesmenLogged,200,res)
    }
}


module.exports = {
    create,
    edit,
    deleteE,
    login
}