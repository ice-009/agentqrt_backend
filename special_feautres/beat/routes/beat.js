const express = require('express');

const router = express.Router();
const beatController = require('../controllers/beat');
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");
router.get('/test', (req, res) => {
    res.json('hello');  // working fine
    });

router.post('/create', verifyAccessToken, beatController.createBeatContr);
router.delete('/delete/:beatId', verifyAccessToken, beatController.deleteBeatContr);
module.exports = router;