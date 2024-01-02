const express = require('express');
const router = express.Router();
const {create_Order} = require('../controllers/orders');
// const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../new_auth/jwt_helper');
const { verifyAccessToken } = require('../../../new_auth/jwt_helper');
// Define the route for creating an order
router.post('/create',verifyAccessToken, create_Order);
router.get('/create',verifyAccessToken, (req,res)=>{
    res.render('orders/create.hbs');
})


module.exports = router;
