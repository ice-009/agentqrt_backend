// profileController.js

const catchAsync = require("../../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require('../../utils/ApiError');
const { Employee } = require('../../model/employee');

const getUserProfile = catchAsync(async (req, res) => {
    console.log('req.params.userId:', req.params.userId);
    console.log('req.user.id:', req.user.id);
    
    if (!req.user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    // Ensure that the requested user ID matches the authenticated user's ID
    if (req.params.userId !== req.user.id) {
        console.log('req.params.userId:', req.params.userId);
        console.log('req.user.id:', req.user.id);
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }

    // Fetch the user details from the database
    const user = await Employee.findById(req.user.id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Render the user profile page with the fetched user details
    res.render('user/profile.hbs', { user });
});

module.exports = {
    getUserProfile,
};
