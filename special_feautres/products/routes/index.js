const express = require('express');
const router = express.Router();
const createProductController = require('../controllers/index')

router.get('/hello', (req,res)=>{
    res.send('hello');
})
router.get('/create', createProductController);

module.exports = router;
