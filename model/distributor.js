
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const distributorSchema = mongoose.Schema({
  distributorId: {
    type:Number,
    unique: true,
  },
  distributorname: {
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
  country:{
    type:String,
    default:"India"
  },
  pincode:{
    type:Number,
    required:true
  },
  state:{
    type:String
  },
  contactperson:{
    type:String
  },
  parentzoneid:{
    type:Number
  },

}); 

// distributorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// }


distributorSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

distributorSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

distributorSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const DistributorModel = mongoose.model('Distributor', distributorSchema);




module.exports = {
  DistributorModel,
};
