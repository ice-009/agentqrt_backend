const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const beatSchema = mongoose.Schema({
  
  beatId: {
    type:Number,
    unique: true,
  },
  outletId:{
    type:Number,
  },
  outletname:{
    type:String
  },
  //outlet erp id   
  outleterpid:{
    type:Number,
    required:true
  },
  leadstatus:{
    type:String
  },
  // it may be change in future enough information 
  //enum based
  category:{
    type:String
  },
  address:{
    type:String
  },

  
}); 

 

const Beat = mongoose.model('Beat', beatSchema);

module.exports = Beat;