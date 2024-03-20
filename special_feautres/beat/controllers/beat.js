// const catchAsyn = require('../../../AddtionalFolders/utils/catchAsync')
const Beat = require('../../../model/beat')
const beatCont = require('../services/beat')
const getBeatContr = async(req,res) => {
    try {
        const beat = await beatCont.getBeat(req.params.beatId)
        res.status(200).json({
        status: 'success',
        data: {
            beat
        }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
        status: 'fail'
        })
        // return err;
    }
    }
const createBeatContr =  async(req,res) => {
    try {
        const beat = await beatCont.createBeat(req.body)
        res.status(201).json({
        status: 'success',
        data: {
            beat
        }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
        status: 'fail'
        })
        // return err;
    }
    }

const deleteBeatContr = async(req,res) => {
    try {
        // const id = await beatCont.deleteBeat(req.params.id)
        const {beatId} = req.params;
        await beatCont.deleteBeat(beatId);
        res.status(201).json({
        status: 'success',
        data: {
            beatId
        }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
        status: 'fail'
        })
        // return err;
    }
    }

module.exports = {
    createBeatContr,
    deleteBeatContr,
    getBeatContr
}