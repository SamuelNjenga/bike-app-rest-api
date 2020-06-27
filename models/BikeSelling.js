const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BikeSellingSchema = mongoose.Schema({
    bikeType: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    // soldItems: {
    //     type: Number,
    //     default: 0,
    //     required: true
    // },
    // remainingItems: {
    //     type: Number,
    //     default: 0,
    //     required: true
    // },
    bikeId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('BikeSelling', BikeSellingSchema);