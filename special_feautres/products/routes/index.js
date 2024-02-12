const express = require('express');
const router = express.Router();
const { createProductController, getProductbyIdController, getAllProductsController } = require('../controllers/index')

router.get('/hello', function (req, res) {
    res.send('hello');
})
router.get('/all', getAllProductsController);

router.post('/create', createProductController);
router.get('/:productId', getProductbyIdController);
// router.get('/a', getAllProductsController);


module.exports = router;
