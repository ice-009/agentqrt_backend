const express = require('express');
const router = express.Router();
const {create_Order} = require('../controllers/orders');

// Define the route for creating an order
router.post('/create', create_Order);
router.get('/get', (req, res) => {
    res.send('Hello World!');
}); 

module.exports = router;
