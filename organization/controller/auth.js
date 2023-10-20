// onst OrganizationModel
const { OrganizationModel } = require("../../model/organization");
const catchAsync = require("../../utils/catchAsync");
const authService = require('../service/auth')

const loginGet = catchAsync(async(req,res)=>{
    res.render("organization/login")
}) 

const registerPost = catchAsync(async (req, res) => {
  try {
    
    const {
      orgId,
      orgname,
      email,
      password,
      username,
      contactnumber,
      address,
      gstno,
      website,
      country,
      pincode,
      yor,
      state,
      contactperson,
      listzone,
    } = req.body;

    // Check if the email is already taken
    const emailTaken = await OrganizationModel.isEmailTaken(email);
    if (emailTaken) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    // Check if the username is already taken
    const usernameTaken = await OrganizationModel.isUsernameTaken(username);
    if (usernameTaken) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new organization document
    const organization = new OrganizationModel({
      orgId,
      orgname,
      email,
      password,
      username,
      contactnumber,
      address,
      gstno,
      website,
      country,
      pincode,
      yor,
      state,
      contactperson,
      listzone,
    });

    // Save the organization in the database
    await organization.save();

    res.status(201).json({ message: 'Organization signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const loginPost = catchAsync(async(req,res)=>{
    const user = await authService.login(req.body,res)
    
}) 


const home = catchAsync(async(req,res)=>{
    // res.render("organization/")
    res.json({message:"Organization Home Page"})
})


module.exports = {
    loginGet,
    home,
    loginPost,
    registerPost
}