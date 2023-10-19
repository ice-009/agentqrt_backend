const ApiError = require('../utils/ApiError')
const nullChecker = require('../helper/nullChecker')
const httpStatus = require('http-status')
const BeatModel = require('../model/beat')

const createBeat = async(body)=>{
     
    if(nullChecker(body.name)) 
        throw new ApiError(httpStatus.BAD_REQUEST,"beat name cannot be empty")
    if(nullChecker(body.erpid))
        throw new ApiError(httpStatus.BAD_REQUEST,"erpid cannot be empty")
    
}

const deleteBeat = async(id)=>{
    
    await BeatModel.Beat.findOneAndDelete({"beatId":id})

    return true
}


const editBeat = async(id,body)=>{
    await BeatModel.Beat.findOneAndUpdate({
        name:body.name,
        erpid:body.erpid
    })
}



module.exports = {
     createBeat,
     deleteBeat
}