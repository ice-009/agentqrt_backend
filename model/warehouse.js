
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const warehouseSchema = mongoose.Schema({
  warehouseId: {
    type:Number,
    unique: true,
  },
  warehousename: {
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

// warehouseSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// }


warehouseSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

warehouseSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

warehouseSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const WarehouseModel = mongoose.model('Warehouse', warehouseSchema);




module.exports = {
  WarehouseModel,
};
