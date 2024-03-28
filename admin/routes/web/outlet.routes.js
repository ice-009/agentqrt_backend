const express = require('express');
const router = express.Router();
const { getOutletPageContr, getOrderReportContr, getTargetContr, getActiReportContr, createTargetContr } = require('../../controller/outlet');

// Define your routes here

router.get('/order/:id', getOrderReportContr);
router.get('/target/:id', getTargetContr);
router.post('/target/:id', createTargetContr);
router.get('/activities/:id', getActiReportContr);
router.get('/:id', getOutletPageContr);
// Export the router
module.exports = router;
