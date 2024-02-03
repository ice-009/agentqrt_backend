const express = require('express');
const router = express.Router();
const {getOutletPageContr, getOrderReportContr} = require('../../controller/outlet');

// Define your routes here
router.get('/:id', getOutletPageContr);
router.get('/order/:id', getOrderReportContr);

// Export the router
module.exports = router;
