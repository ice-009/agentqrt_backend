const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  zoneId: {
    type: String
  },
  name: {
    type: String
  },
  pincode: [{
    type: Number,
    trim: true,
  }],
  district: [{
    type: String,
    trim: true,
  }],
  parentId: {
    type: String,
    required: true
  },
  distributor: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Distributor'
  }],
  warehouse: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Warehouse'
  }]
});

const ZoneModel = mongoose.model('Zone', zoneSchema);

module.exports = ZoneModel;
