const express = require('express');
const router = express.Router();
const { getOutletPageContr, getOrderReportContr, getTargetContr, getActiReportContr } = require('../../controller/outlet');

// Define your routes here

router.get('/orders/:id', getOrderReportContr);
router.get('/target/:id', getTargetContr);
router.get('/activities/:id', getActiReportContr);
router.get('/:id', getOutletPageContr);
// Export the router
module.exports = router;
