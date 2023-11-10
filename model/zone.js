const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  zoneId: {
    type: Number
  },
  name: {
    type: String
  },
  pincode: {
    type: String,
    trim: true,
  },
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
  }],

    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'Organization'
    // organization: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Organization',
    //   // required: true
    // }
  }
);

const ZoneModel = mongoose.model('Zone', zoneSchema);

module.exports = ZoneModel;