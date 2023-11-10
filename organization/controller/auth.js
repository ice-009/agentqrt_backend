// onst OrganizationModel
const { OrganizationModel } = require("../../model/organization");
const catchAsync = require("../../utils/catchAsync");
const authService = require('../service/auth')
async function generateUniqueOrgId() {
  try {
    // Find the document with the highest orgId
    const highestOrg = await OrganizationModel
      .findOne({}, { orgId: 1 })
      .sort({ orgId: -1 })
      .limit(1);

    if (highestOrg) {
      // Extract the highest orgId and add 1
      const lastOrgId = highestOrg.orgId;
      const newOrgId = lastOrgId + 1;
      return newOrgId;
    } else {
      // If no documents exist, start with orgId 1
      return 1;
    }
  } catch (error) {
    console.error('Error generating unique orgId:', error);
    throw error;
  }
}
const loginGet = catchAsync(async(req,res)=>{
    res.render("organization/login")
}) 
const registerGet =  catchAsync(async(req,res)=>{
    res.render("organization/register")
})
const registerPost = catchAsync(async (req, res) => {
  try {
    const newOrgId = await generateUniqueOrgId(); // Generate a unique orgId
    const {
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

    // Create a new organization document with the generated orgId
    const organization = new OrganizationModel({
      orgId: newOrgId, // Use the generated orgId
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
    registerGet,
    registerPost
}