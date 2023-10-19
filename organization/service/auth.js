const {Organization} = require('../../model/')
const {sendTokenWeb} = require('../util/token')
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs')

const login = async (body, res) => {
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
    const organization = await Organization.OrganizationModel.findOne({ username: body.username }).select("+password");
    if (!organization)
        res.status(404).json({ success: false, message: "invalid user and password" })
    const isPasswordMatched = await bcrypt.compare(body.password, organization.password);
    if (!isPasswordMatched) {
        res.status(401).json({ success: false, message: "Invalid email and password" })
    } else {
        sendTokenWeb(organization, 200, res)
    }
}
 


module.exports = {
    login
}