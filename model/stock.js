const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    outletId: {
        type: String,
        required: true
    },
    stock: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        unit: {
            type: Number,
            default: 0 // Default value for unit
        },
        cases: {
            type: Number,
            default: 0 // Default value for cases
        }
    }]
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
