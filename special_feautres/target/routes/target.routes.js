// const e = require('express');
const express = require('express');
const targetController = require('../controllers/target.controller');
const router = express.Router();

const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../../new_auth/jwt_helper");
router.get('/', (req, res) => {
    res.send('Hello World'); // working fine

});

router.post('/create', verifyAccessToken, targetController.createTarget);


module.exports = router;