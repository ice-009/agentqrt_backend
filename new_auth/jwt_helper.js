const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const cookie = require('cookie');
const { EmployeeModel } = require('../model/employee');

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userId
            };
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "30d",
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
    
    // Update the verifyAccessToken function
    verifyAccessToken: (req, res, next) => {
        const err = new Error('Not authenticated');
    
        // Check Bearer token in the Authorization header
        const authHeader = req.headers['authorization'];
    
        if (authHeader) {
            const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    
            if (token) {
                JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                    if (err) {
                        if (err.name === 'JsonWebTokenError') {
                            return next(createError.Unauthorized());
                        } else {
                            return next(createError.Unauthorized(err.message));
                        }
                    }
    
                    req.user = payload;
                    console.log("user: ", req.user);
                    return next();
                });
                return; // Exit the function if Bearer token is found
            }
        }
    
        // Check access token in the Cookie header
        if (req.headers['cookie']) {
            const cookies = cookie.parse(req.headers['cookie']);
            const accessToken = cookies['access_token'];
    
            if (accessToken) {
                JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
                    if (err) {
                        if (err.name === 'JsonWebTokenError') {
                            return next(createError.Unauthorized());
                        } else {
                            return next(createError.Unauthorized(err.message));
                        }
                    }
    
                    req.user = payload;
                    console.log("user: ", req.user);
                    return next();
                });
                return; // Exit the function if access token is found in cookies
            }
        }
    
        // If neither Authorization header nor Cookie contains the token, throw an error
        console.log("No valid Authorization header or Cookie");
        throw err;
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
