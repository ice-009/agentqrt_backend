// const e = require('express');
const express = require('express');
const targetController = require('../controllers/target.controller');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World'); // working fine

});

router.post('/create', targetController.createTarget);


module.exports = router;