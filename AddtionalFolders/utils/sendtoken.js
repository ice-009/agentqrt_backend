const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    try {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 // in seconds
        });

        const options = {
            expires: new Date(
                Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // in milliseconds
            ),
            httpOnly: true
        };

        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            user,
            token
        });
    } catch (error) {
        console.error('Error sending token:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = sendToken;
