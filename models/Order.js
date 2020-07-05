const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = mongoose.Schema({
    customerId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bikeType: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    bikeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    },
    numberOfItemsOrdered: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Order', OrderSchema);