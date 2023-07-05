const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const organizationSchema = mongoose.Schema({
  orgId: {
    type:Number,
    unique: true,
  },
  orgname: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {  
    type: String,
    trim: true, 
    private: true
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
    private:true
  },
  username: {
    type: String,
    trim: true
  },
  contactnumber: {
    type: String,
    trim: true,
    lowercase: true
  },
  address:{
    type:String,
    trim:true
  },
  gstno:{
    type:String
  },
  website:{
    type:String
  },
  country:{
    type:String,
    default:"India"
  },
  pincode:{
    type:Number,
    required:true
  },
  yor:{
    type:Number
  },
  state:{
    type:String
  },
  contactperson:{
    type:String
  }

}); 

organizationSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

organizationSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

organizationSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

organizationSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const OrganizationModel = mongoose.model('Organization', organizationSchema);




module.exports = {
  OrganizationModel,
};
