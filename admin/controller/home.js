const catchAsync = require("../../AddtionalFolders/utils/catchAsync");




const home = catchAsync(async (req,res)=>{
    res.render('admin/home.hbs')
})



module.exports = {
    home
}