const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    outletId: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    ActivityType: {
        type: String,
        // required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,   
        required: true,
    },
    Comment: {
        type: String,
        // required: true,
    },
    lat: {
        type: String,
        // required: true
    },
    long: {
        type: String,
        // required: true
    }

});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = { Activity };