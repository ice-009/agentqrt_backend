const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const orderSchema = mongoose.Schema({

  orderId: {
    type: Number,
    unique: true,
    trim: true,
  },
  userId: {
    type: String,
    trim: true,
    lowercase: true
  },
  productId: [{
    type: Number
  }],
  companyId: {
    type: String
  },
  reason: [{
    type: String
  }],
  quantity: [{
    type: Number,
  }],
  pieceprice: [{
    type: Number,
  }],
  pieceAmount: [{
    type: Number,
  }],
  amount: [{
    type: Number,
    required: true
  }],
  date: {
    type: Date,
    default: Date.now(),
  },
  outletId: {
    type: Number,
    required: true
  }
});



const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
