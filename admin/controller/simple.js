const catchAsync = require("../../utils/catchAsync");





const home = catchAsync(async (req,res)=>{
    res.render('index.hbs')
})



module.exports = {
    home
}