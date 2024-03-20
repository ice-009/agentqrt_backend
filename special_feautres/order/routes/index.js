const express = require('express');
const router = express.Router();
const Order = require('../../../model/order');
// const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");
const {create_Order} = require('../controllers/orders');
// const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('../new_auth/jwt_helper');
const { verifyAccessToken } = require('../../../new_auth/jwt_helper');
// Define the route for creating an order

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    Order.findById(id)
        .exec()
        .then((outlets) => {
            res.status(200).json(outlets);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching Ordder.' });
        });

})

router.post('/create',verifyAccessToken, create_Order);
router.get('/create',verifyAccessToken, (req,res)=>{
    res.render('orders/create.hbs');
})


module.exports = router;
