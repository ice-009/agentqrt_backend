const express = require('express');
//const authValidation = require('../validation/authValidation');
// const validator = require('../middlewares/validator');
const { outletController } = require('../../controller');
const { authToken } = require('../../middleware/auth');
const { Outlet } = require('../../model/outlet');

const router = express.Router();

router.get('/', (req, res)=>{
  res.send('hello outlets')
})

router.post(
  '/register',
  outletController.createOutlet
)
router.post(
  '/login',
  outletController.loginOutlet
)
router.post(
  '/resetpassword',
  authToken,
  outletController.resetPassword
)
router.post(
  '/edit',
  outletController.editOutlet
)
router.post(
  '/delete',
  outletController.deleteOutlet
)

router.get('/:id', (req,res)=>{
  // const id = req.params.id;
  const distributorId = req.params.id;

  Outlet.find({ distributor: distributorId })
    .exec()
    .then((outlets) => {
      res.status(200).json(outlets);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching outlets.' });
    });

})



module.exports = router;
