const express = require('express');
const router = express.Router();
const { getOutletPageContr, getOrderReportContr, getTargetContr, getActiReportContr, createTargetContr, manageTargetContr, deleteTargetContr } = require('../../controller/outlet');

// Define your routes here

router.get('/order/:id', getOrderReportContr);
router.get('/target/:id', getTargetContr);
router.post('/target/:id', createTargetContr);
router.get('/activities/:id', getActiReportContr);
router.get('/:id', getOutletPageContr);
router.get('/target/manage/:id', manageTargetContr);
router.post('/target/delete/:id/:targetId', deleteTargetContr);
// Export the router
module.exports = router;
