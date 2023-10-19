const {Distributor} = require('../../model/')
const {sendTokenWeb} = require('../util/token')
const { nullChecker } = require('../../helper/nullChecker');
const bcrypt = require('bcryptjs')

const login = async (body, res) => {
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, 'password_required');
    const distributor = await Distributor.DistributorModel.findOne({ username: body.username }).select("+password");
    if (!distributor)
        res.status(404).json({ success: false, message: "invalid user and password" })
    const isPasswordMatched = await bcrypt.compare(body.password, distributor.password);
    if (!isPasswordMatched) {
        res.status(401).json({ success: false, message: "Invalid email and password" })
    } else {
        sendTokenWeb(distributor, 200, res)
    }
}
 


module.exports = {
    login
}