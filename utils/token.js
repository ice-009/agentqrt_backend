const jwt = require('jsonwebtoken');

const sendTokenWeb = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE // in seconds
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // in milliseconds
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).redirect('/admin');
};

module.exports = sendTokenWeb;
