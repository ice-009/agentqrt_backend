const jwt = require('jsonwebtoken');

const distributorToken = (req, res, next) => {
    const cookie = req.cookies
    console.log(cookie.token)
    try {
        const decoded = jwt.verify(cookie.token, process.env.JWT_SECRET);
        console.log(decoded)
        req.user = decoded;
    } catch (err) {
        res.redirect("/distributor/login")
        // return res.status(401).send('Invalid cookie');
    }
    return next();

}


module.exports = {
    distributorToken
}

