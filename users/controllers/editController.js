const catchAsync = require("../../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require('../../utils/ApiError');
const { EmployeeModel } = require('../../model/employee');

const editUserProfile = async(req,res)=>{

    res.render('user/edit.hbs')
}
const editUserProfilePost = catchAsync(async(req,res)=>{
    if (!req.user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }
    if (req.params.userId !== req.user.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    const user = await EmployeeModel.findById(req.user.id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

})