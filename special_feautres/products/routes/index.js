const express = require('express');
const router = express.Router();
const {createProductController} = require('../controllers/index')

router.get('/hello', function(req,res){
    res.send('hello');
})
router.post('/create', createProductController);

module.exports = router;
