const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const authToken = (req, res, next) => {
  const token =
    req.headers['token'] || req.body.token || req.query.token || req.headers['x-access-token'];
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


const adminToken = (req,res,next) =>{
  const cookie = req.cookies
  // if(cookie){
    console.log(cookie.token)
    try {
      console.log(cookie.token)
      const decoded = jwt.verify(cookie.token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      res.redirect("/admin/login")
      // return res.status(401).send('Invalid cookie');
    }
    return next();
    
    
   

}


module.exports = {
  authToken,
  adminToken
};
