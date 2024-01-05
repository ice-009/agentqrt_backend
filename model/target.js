const mongoose = require('mongoose');

const targetSchema = new mongoose.Schema({
    TargetPeriod : {
        type: Date,  
        required: true, 
    },
    CollectionAmount : {
        type: Number,
        required: true,
    },
    StartDate : {
        type: Date,
        required: true,
    },
    OutletId : {
        type: String,
        required: true,
    },
});

const Target = mongoose.model('Target', targetSchema);

module.exports = { Target };