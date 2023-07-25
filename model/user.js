// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const employeeSchema = mongoose.Schema({
//   employeeId: {
//     type:Number,
//     unique: true,
//   },
//   name: {
//     type: String
//   },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {  
//     type: String,
//     trim: true, 
//     private: true
//   },
//   passwordChangedAt: {
//     type: Date,
//     default: Date.now(),
//     private:true
//   },
//   username: {
//     type: String,
//     trim: true
//   },
//   phonenumber: {
//     type: String,
//     trim: true,
//     lowercase: true
//   },
//   dateOfBirth: {
//     type: Date, 
//     trim: true
//   },
//   gender: {
//     type: String,
//     trim: true,
//     enum: ['male', 'female']
//   },
//   dp:{
//     type:String,
//     default:'/pic/default.webp'
//   },
//   address:{
//     type:String,
//     trim:true
//   },
//   imie:{
//     type:String
//   },
//   role:{
//     type:String
//   },
//   for:{
//     type:String,  //agencies - distribution
//   },
//   hierarchy:{
//     type:String
//   },
//   logindetail:[
//     {
//         type: Date,
//     }
//   ],
//   reportingmanager:[{
//     type:String
//   }],
//   createdBy:{
//     type:String
//   }

// }); 

// employeeSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// employeeSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
//   const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
//   return !!user;
// };

// employeeSchema.methods.isPasswordMatch = async function (password) {
//   const user = this;
//   return bcrypt.compare(password, user.password);
// };

// employeeSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });
 
// const Employee = mongoose.model('Employee', employeeSchema);



// const employeeDelSchema = mongoose.Schema({
//   employeeId: {
//     type:Number,
//     unique: true,
//   },
//   name: {
//     type: String
//   },
//   email: {
//     type: String,
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {  
//     type: String,
//     trim: true, 
//     private: true
//   },
//   passwordChangedAt: {
//     type: Date,
//     default: Date.now(),
//     private:true
//   },
//   username: {
//     type: String,
//     trim: true
//   },
//   phonenumber: {
//     type: String,
//     trim: true,
//     lowercase: true
//   },
//   dateOfBirth: {
//     type: Date,
//     trim: true
//   },
//   gender: {
//     type: String,
//     trim: true,
//     enum: ['male', 'female']
//   },
//   dp:{
//     type:String,
//     default:'/pic/default.webp'
//   },
//   address:{
//     type:String,
//     trim:true
//   },
//   imie:{
//     type:String
//   },
//   role:{
//     type:String
//   },
//   for:{
//     type:String,  //agencies - distribution
//   },
//   hierarchy:{
//     type:String
//   },
//   logindetail:[
//     {
//         type: Date,
//     }
//   ],
//   reportingmanager:[{
//     type:String
//   }],
//   createdBy:{
//     type:String
//   }

// }); 

 
// const Employeedel = mongoose.model('EmployeeDel', employeeDelSchema);


// module.exports = {
//   Employee,
//   Employeedel
// };
