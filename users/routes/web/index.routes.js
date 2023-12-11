const express = require('express')
const router = express.Router();

const {login, loginpost} = require('../../controllers/auth');
const profileController = require('../../controllers/profileController');
// router.get('/edit',)
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../new_auth/jwt_helper");





router.get('/login',login);
router.post('/login', loginpost);

router.get('/hello', verifyAccessToken, (req, res) => {
    res.send('its done isnt it')})
router.get('/profile/:userId',verifyAccessToken, profileController.getUserProfile);
// router.get('/edit')



module.exports = router;