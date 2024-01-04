const ApiError = require('../../../AddtionalFolders/utils/ApiError')
const nullChecker = require('../../../AddtionalFolders/helper/nullChecker')
const httpStatus = require('http-status')
const {Beat} = require('../../../model/beat')

const createBeat = async (body) => {

    try {
        const beatid = await Beat.find().sort({ "beatId": -1 }).limit(1);
        let id;

        if (beatid.length === 0 || !beatid[0].hasOwnProperty('beatId')) {
            id = 1;
        } else {
            id = beatid[0].beatId + 1;
        }

        return await Beat.create({
            beatId: id,
            outletId: body.outletId,
            outletname: body.outletname,
            outleterpid: body.outleterpid,
            leadstatus: body.leadstatus,
            category: body.category,
            address: body.address
        });
    } catch (error) {
        console.error('Error creating beat:', error.message);
        throw new ApiError(500, "Internal Server Error");
    }
}

const deleteBeat = async(id)=>{
    
    await Beat.findOneAndDelete({"beatId":id})

    return true
}


const editBeat = async(id,body)=>{
    await Beat.findOneAndUpdate({
        name:body.name,
        erpid:body.erpid
    })
}



module.exports = {
     createBeat,
     deleteBeat
}