const express = require('express');

const router = express.Router();
const beatController = require('../controllers/beat');
router.get('/test', (req, res) => {
    res.json('hello');  // working fine
    });

router.post('/create', beatController.createBeatContr);
router.delete('/delete/:beatId', beatController.deleteBeatContr);
module.exports = router;