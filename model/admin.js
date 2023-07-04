const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = mongoose.Schema({
  employeeId: {
    type:Number,
    unique: true,
  },
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
  role: {
    type: String,
    trim: true,
    enum: ['superadmin', 'admin']
  },

}); 

adminSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

adminSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

adminSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

adminSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const Admin = mongoose.model('AdminUser', adminSchema);


module.exports = {
  Admin,
};
