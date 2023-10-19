const httpStatus = require("http-status");
const { nullChecker } = require('../helper/nullChecker');
const ApiError = require('../utils/ApiError');
var validator = require("email-validator");
const { valueChecker } = require('../helper/valuechecker');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const sendToken = require('../utils/sendtoken');
const OutletModel = require("../model/outlet");


const createOutlet = async (outletBody) => {

    if (nullChecker(outletBody.name) ||valueChecker(outletBody.name,Joi.string()))
      throw new ApiError(httpStatus.BAD_REQUEST, ' name_required');
    if (nullChecker(outletBody.email) || !validator.validate(outletBody.email))
      throw new ApiError(httpStatus.BAD_REQUEST, ' email_required');
    if (nullChecker(outletBody.password))
      throw new ApiError(httpStatus.BAD_REQUEST, ' password_required');
    if (await OutletModel.Outlet.isEmailTaken(outletBody.email))
      throw new ApiError(httpStatus.BAD_REQUEST, 'email_already_taken');
    if(nullChecker(outletBody.phoneno))
       throw new ApiError(httpStatus.BAD_REQUEST,' phone no required')
    if(nullChecker(outletBody.pincode))
       throw new ApiError(httpStatus.BAD_REQUEST,' pincode required')
    if(nullChecker(outletBody.district))
       throw new ApiError(httpStatus.BAD_REQUEST,' distric required')
    if(nullChecker(outletBody.state))
        throw new ApiError(httpStatus.BAD_REQUEST,' state required')
    if(nullChecker(outletBody.address))
        throw new ApiError(httpStatus.BAD_REQUEST,' address required')
    if(nullChecker(outletBody.ownername))
        throw new ApiError(httpStatus.BAD_REQUEST,' ownername required')
    if(nullChecker(outletBody.owneraadhar))
        throw new ApiError(httpStatus.BAD_REQUEST,' owneraadhar required')
    if(nullChecker(outletBody.gstno))
        throw new ApiError(httpStatus.BAD_REQUEST,' gstno required')

    const idBody = await OutletModel.Outlet.find().sort({"outletId":-1}).limit(1);

    var id;
    if(idBody.length==0){
        console.log('a')
        id = 1;
        console.log(id)
    }else{
      console.log('aa')
        id = idBody[0].outletId+1
    }

   

    return OutletModel.Outlet.create( {
       "name":outletBody.name,
       "email":outletBody.email,
       "password":outletBody.password,
       "username":outletBody.username,
       "phoneno":outletBody.phoneno,
       "pincode":outletBody.pincode,
       "district":outletBody.district,
       "outletstate":outletBody.outletstate,
       "state":outletBody.state,
       "city":outletBody.city,
       "address":outletBody.address, 
       "outletlevel":outletBody.outletlevel,
       "area":outletBody.area,
       "outlettype":outletBody.outlettype,
       "ownername":outletBody.ownername,
       "owneraadhar":outletBody.owneraadhar,
       "gstno":outletBody.gstno,
       "dinNo":outletBody.dinNo,
       "foodlicenceno":outletBody.foodlicenceno,
       "cinno":outletBody.cinno,
       "longitude":outletBody.longitude,
       "latitude":outletBody.latitude,
       "outletId":id,
       "beat":outletBody.beat,
       "url":outletBody.imgurl
      })
} 

const loginOutlet = async (outletBody,res) =>{
    if (nullChecker(outletBody.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
    if (nullChecker(outletBody.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
    const outlet = await OutletModel.Outlet.findOne({username:outletBody.username}).select("+password");
    if(!outlet)
        res.status(404).json({success:false,message:"invalid user and password"})
    const isPasswordMatched =await bcrypt.compare(outletBody.password,outlet.password);
    if(!isPasswordMatched){res.status(401).json({success:false,message:"Invalid email and password"})
    }else{
        const userLogged = await OutletModel.Outlet.findOne({username:outletBody.username})
        sendToken(userLogged,200,res)
    }
}

const resetPassword = async (outletId,outletBody,res) => {
    if (nullChecker(outletBody.password))
      throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
    if (nullChecker(outletBody.newpass))
      throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
    const outlet = await OutletModel.Outlet.findById(outletId.id).select("+password")
    if(!outlet)
      res.status(404).json({success:false,message:"invalid password"})
    const isPasswordMatched =await bcrypt.compare(outletBody.password,outlet.password);
    console.log(isPasswordMatched)
    if(!isPasswordMatched){res.status(401).json({success:false,message:"Invalid email and password"})
    }else{
      password = await bcrypt.hash(outletBody.newpass,8);
      // console.log(password)
      // console.log(outletId)
      const outletLogged = await OutletModel.Outlet.findOneAndUpdate({username:outlet.username},{password:password})
      sendToken(outletLogged,200,res)
    }
}


const editOutlet = async (erpId,outletBody) =>{
    await OutletModel.Outlet.findOneAndUpdate(
      {"erpId":erpId},{
        "name":outletBody.name,
        "email":outletBody.email,
        "password":outletBody.password,
        "username":outletBody.username,
        "phoneno":outletBody.phoneno,
        "pincode":outletBody.pincode,
        "district":outletBody.district,
        "outletstate":outletBody.outletstate,
        "state":outletBody.state,
        "city":outletBody.city,
        "address":outletBody.address,
        "outletlevel":outletBody.outletlevel,
        "area":outletBody.area,
        "outlettype":outletBody.outlettype,
        "ownername":outletBody.ownername,
        "owneraadhar":outletBody.owneraadhar,
        "gstno":outletBody.gstno,
        "dinNo":outletBody.dinNo,
        "foodlicenceno":outletBody.foodlicenceno,
        "cinno":outletBody.cinno,
        "longitude":outletBody.longitude,
        "latitude":outletBody.latitude,
        "beat":outletBody.beat,
        "url":outletBody.url
      }
    )
    console.log(erpId)
    const a = await OutletModel.Outlet.findOne({"erpId":erpId})
    console.log(a)
    return a
}


const deleteOutlet = async (erpId)=>{
  
  const outlet = await OutletModel.Outlet.findOne({"erpId":erpId})

  OutletModel.Outletdel.create( {
    "name":outlet.name,
    "email":outlet.email,
    "password":outlet.password,
    "username":outlet.username,
    "phoneno":outlet.phoneno,
    "pincode":outlet.pincode,
    "district":outlet.district,
    "outletstate":outlet.outletstate,
    "state":outlet.state,
    "city":outlet.city,
    "address":outlet.address,
    "outletlevel":outlet.outletlevel,
    "area":outlet.area,
    "outlettype":outlet.outlettype,
    "ownername":outlet.ownername,
    "owneraadhar":outlet.owneraadhar,
    "gstno":outlet.gstno,
    "dinNo":outlet.dinNo,
    "foodlicenceno":outlet.foodlicenceno,
    "cinno":outlet.cinno,
    "longitude":outlet.longitude,
    "latitude":outlet.latitude,
    "erpId":erpId,
    "beat":outlet.beat
   })

   await OutletModel.Outlet.findOneAndDelete({"erpId":erpId})
}



module.exports = {
    createOutlet,
    loginOutlet,
    resetPassword,
    editOutlet,
    deleteOutlet
} 