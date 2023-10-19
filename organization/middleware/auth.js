const jwt = require('jsonwebtoken');
const OragnizationModel = require('../../model/organization')

const organizationToken = async(req, res, next) => {
    const cookie = req.cookies
    console.log(cookie.token)
    try {
        const decoded = jwt.verify(cookie.token, process.env.JWT_SECRET);
        const chk = await OragnizationModel.OrganizationModel.findById(decoded.id)
        if(chk==null){
            console.log(b)
        }
        req.user = decoded;

    } catch (err) {
        res.redirect("/organization/login")
    }
    return next();

}


module.exports = {
    organizationToken
}

