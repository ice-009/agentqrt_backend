const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (req, res, next) => {
  const token =
    req.headers['token'] || req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Invalid Token');
  }
};

const extractToken = (req) => {
  // Try extracting from headers
  const authorizationHeader = req.headers['authorization'];
  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    return authorizationHeader.substring(7);
  }

  // Try extracting from query parameters
  const queryToken = req.query.token;
  if (queryToken) {
    return queryToken;
  }

  // Try extracting from request body
  const bodyToken = req.body.token;
  if (bodyToken) {
    return bodyToken;
  }

  // Try extracting from cookies
  const cookieToken = req.cookies.token;
  if (cookieToken) {
    return cookieToken;
  }

  // Add more methods of extraction as needed

  // If none of the methods work, return null
  return null;
};

const adminToken = (req, res, next) => {
  console.log(req.cookies);
  
  const token = extractToken(req);

  console.log("token", token);

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  return next();
};

module.exports = {
  authToken,
  adminToken
};
