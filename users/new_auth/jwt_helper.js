const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const cookie = require('cookie');
const { EmployeeModel } = require('../../model/employee');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "armaanshukla06@gmail.com",
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        console.log("req.headers", req.headers);
        const err = new Error('Not authenticated');

        // Check if 'cookie' header exists
        if (!req.headers['cookie']) {
            throw err;
        }

        // Parse cookies from 'cookie' header
        const cookies = cookie.parse(req.headers['cookie']);

        // Extract the access token from cookies
        const accessToken = cookies['access_token'];

        if (!accessToken) {
            throw err;
        }

        JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createError.Unauthorized());
                } else {
                    return next(createError.Unauthorized(err.message));
                }
            }

            req.payload = payload;
            next();
        });
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: "1y",
                issuer: "armaanshukla06@gmail.com",
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
                if (err) {
                    const error = new Error('Unauthorized');
                    return reject(error);
                }

                const userId = payload.aud;

                try {
                    const user = await EmployeeModel.findById(userId);
                    if (!user || user.revokedRefreshTokens.includes(refreshToken)) {
                        const error = new Error('Unauthorized');
                        return reject(error);
                    }

                    resolve({ userId });
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
};
