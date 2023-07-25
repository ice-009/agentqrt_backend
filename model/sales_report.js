const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const reportSchema = mongoose.Schema({
  salesId: {
    type:Number,
    unique: true,
  },
  phoneno:{
    type:String
  },
  brandname:{
    type:String
  }

  
 
  
  

}); 


 
module.exports = mongoose.model('Report', reportSchema);


// module.exports = {
//   Report,
// };
