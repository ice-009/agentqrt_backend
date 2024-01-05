const targetService = require('../service/target.service');

const createTarget = async(req,res) =>{
    try{
    const body = req.body;
    const target = await targetService.createtarget(body);
    res.status(200).json(target);
    }
    catch(err){
        res.status(500).json({message: err});
    }
}

module.exports = { createTarget };