const catchAsync = require("../../AddtionalFolders/utils/catchAsync");




const home = catchAsync(async (req, res) => {
    res.render('index.ejs')
})



module.exports = {
    home
}