const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const outletSchema = mongoose.Schema({
  name: {
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
  phoneno: {
    type:Number,
    trim: true,
    lowercase: true
  },
  pincode:{
    type:Number,
    trim:true,
    required:true
  },
  district:{
    type:String,
    trim:true,
    required:true
  },
  outletstate:{
    type:String
  },
  state:{
    type:String,
    required:true,
    trim:true
  },
  city:{
    type:String,
    trim:true
  },
  // erpId:{
  //   type:Number,
  //   required:true
  // },
  outletId:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    trim:true,
    required:true
  },
  

  //data type modified soon

  outletlevel:{
    type:String
  },
  area:{
    type:String
  },
  outlettype:{
     type:String
  },
  beat:[
    {
        type:String
    }
  ],
  ownername:{
    type:String,
    trim:true,
    required:true
  },
  owneraadhar:{
    type:Number,
    trim:true
  },
  gstno:{
    type:String,
    trim:true,
    required:true
  },
  dinNo:[{
    type:String,
    trim:true
  }],
  foodlicenceno:{
    type:String,
    trim:true
  },
  cinno:{
    type:String,
    trim:true
  },
  longitude:{
    type:Number,
    trim:true
  },
  latitude:{
    type:Number,
    trim:true
  },
  url:{
    type:String
  }

  
});

outletSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

outletSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

outletSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

outletSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});





const outletDelSchema = mongoose.Schema({
  name: {
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
  phoneno: {
    type:Number,
    trim: true,
    lowercase: true
  },
  pincode:{
    type:Number,
    trim:true,
    required:true
  },
  district:{
    type:String,
    trim:true,
    required:true
  },
  outletstate:{
    type:String
  },
  state:{
    type:String,
    required:true,
    trim:true
  },
  city:{
    type:String,
    trim:true
  },
  erpId:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    trim:true,
    required:true
  },
  

  //data type modified soon

  outletlevel:{
    type:String
  },
  area:{
    type:String
  },
  outlettype:{
     type:String
  },
  beat:[
    {
        type:String
    }
  ],
  ownername:{
    type:String,
    trim:true,
    required:true
  },
  owneraadhar:{
    type:Number,
    trim:true
  },
  gstno:{
    type:Number,
    trim:true,
    required:true
  },
  dinNo:[{
    type:Number,
    trim:true
  }],
  foodlicenceno:{
    type:Number,
    trim:true
  },
  cinno:{
    type:Number,
    trim:true
  },
  longitude:{
    type:Number,
    trim:true
  },
  latitude:{
    type:Number,
    trim:true
  },

  
});


const Outlet = mongoose.model('Outlet', outletSchema);
const Outletdel = mongoose.model('Outletdel', outletDelSchema);

module.exports = {
    Outlet,
    Outletdel
}