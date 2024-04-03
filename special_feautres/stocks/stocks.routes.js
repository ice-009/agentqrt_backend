const express = require('express');
const router = express.Router();
const {addStockContr, updateStockContr, getStockContr, updateAllStocksContr} = require('./stocks.controller');

router.get('/', (req,res)=>{
    res.send('hello') // working
})
// Route to add stock for an outlet
router.post('/', addStockContr);

// Route to update stock for a product in an outlet
router.patch('/stock/:outletId/:productId', updateStockContr);

// Route to get stock for an outlet
router.get('/stock/:outletId', getStockContr);

router.put('/stock/updateall/:outletId', updateAllStocksContr);


module.exports = router;
