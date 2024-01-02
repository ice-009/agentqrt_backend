const jwt = require('jsonwebtoken');
const ApiError = require('../AddtionalFolders/utils/ApiError');
const httpStatus = require('http-status');
const JWT_SECRET = process.env.JWT_SECRET;

const authToken = (requiredRole) => (req, res, next) => {
  console.log('Request Object:', req);
  const token =
    req.headers['token'] || req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded Token:', decoded);  // Add this line to log the decoded token

    // Check if the user has the required role or has a role with higher privileges
    if (
      requiredRole &&
      (decoded.role === 'admin' || decoded.role === 'manager' || decoded.role === requiredRole)
    ) {
      req.user = decoded;
      return next();
    } else {
      return res.status(403).send('Insufficient permissions');
    }
  } catch (err) {
    console.error(err);

    // Customize the response based on the specific error
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).send('Invalid Token');
    } else if (err.name === 'TokenExpiredError') {
      return res.status(401).send('Token has expired');
    } else {
      return res.status(500).send('Internal Server Error');
    }
  }
};


const adminToken = authToken('admin');
const managerToken = authToken('manager');
const employeeToken = authToken('employee');

module.exports = {
  authToken,
  adminToken,
  managerToken,
  employeeToken,
};
