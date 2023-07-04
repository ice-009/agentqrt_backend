const catchAsync = require("../../utils/catchAsync");


// const funModiHtml = (mod)=>{
//     return 
// } 



const home = catchAsync(async (req,res)=>{
    const radio = "radio"
    res.render('index.hbs')
})



module.exports = {
    home
}