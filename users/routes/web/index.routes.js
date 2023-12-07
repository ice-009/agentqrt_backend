const express = require('express')
const router = express.Router();

const {login, loginpost} = require('../../controllers/auth');
const profileController = require('../../controllers/profileController');
// router.get('/edit',)
const {signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken} = require("../../new_auth/jwt_helper");





router.get('/login',login);
router.post('/login', loginpost);

router.get('/hello', verifyAccessToken, (req, res) => {
    const accessToken = req.cookies['access_token'];
const refreshToken = req.cookies['refresh_token'];
    // console.log(accessToken)
    res.send('its done isnt it')})
router.get('/profile/:userId',verifyAccessToken, profileController.getUserProfile);

// router.get('/profile/:id',employeeToken,(req,res)=>{
//     res.render('user/profile.hbs')
// })
// 

module.exports = router;