const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const zoneSchema = mongoose.Schema({
  zoneId:{
    type:Number
  },
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
  parentId:{
    type:String,
    required:true
  },
  distributor:[{
    type:String,
    trim:true
  }],
  warehouse:[{
    type:String,
    trim:true
  }]

});





const ZoneModel = mongoose.model('Zone', zoneSchema);

module.exports = {
    ZoneModel,
}