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
    type: String,
    trim: true
  }],
  warehouse: [{
    type: String,
    trim: true
  }]
});

const ZoneModel = mongoose.model('Zone', zoneSchema);

module.exports = ZoneModel;
