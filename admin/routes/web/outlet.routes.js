const express = require('express');
const router = express.Router();
const {getOutletPageContr, getOrderReportContr, getTargetContr} = require('../../controller/outlet');

// Define your routes here
router.get('/:id', getOutletPageContr);
router.get('/order/:id', getOrderReportContr);
router.get('/target/:id', getTargetContr);

// Export the router
module.exports = router;
