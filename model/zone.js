const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const zoneSchema = mongoose.Schema({
  name: {
    type: String
  },
  pincode:[{
    type:Number,
    trim:true,
  }],
  district:[{
    type:String,
    trim:true,
  }],
  parentorg:{
    type:String,
    required:true
  },
  distributor:[{
    type:String,
    trim:true
  }]
  
});





const Zone = mongoose.model('Zone', zoneSchema);

module.exports = {
    Zone,
}