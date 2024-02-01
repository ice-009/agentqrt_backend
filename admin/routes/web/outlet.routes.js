const express = require('express');
const router = express.Router();
const {getOutletPageContr} = require('../../controller/outlet');

// Define your routes here
router.get('/:id', getOutletPageContr);

// Export the router
module.exports = router;
