const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orderSchema = mongoose.Schema({

  orderId: {
    type:Number,
    unique: true,
    trim: true,
  },
  userId:{
     type:String,
     trim: true,
     lowercase: true
  },
  reason:[{
    type:String
  }],
  quantityprice:{
    type:Number,
    required:true
  },
  pieceprice:{
    type:Number,
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  outletid:{
    type:String,
    required:true
  }

}); 



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
