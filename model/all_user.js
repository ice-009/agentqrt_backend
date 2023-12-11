// allUsersModel.js

const mongoose = require('mongoose');

const allUsersSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  email: String,
  role: String,
  password: String
});

const AllUsers = mongoose.model('AllUsers', allUsersSchema);

module.exports = {AllUsers};
