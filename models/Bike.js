const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BikeSchema = mongoose.Schema({
    bikeType: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    inCart: {
        type: Boolean,
        required: true,
        default: false
    },
    total: {
        type: Number,
        default: 0,
        required: true
    },
    count: {
        type: Number,
        default: 1,
        required: true
    },
    bikeDescription: {
        type: String,
        required: true
    },
    keyFeatures: {
        type: String,
        required: true
    },
    specifications: {
        type: String,
        required: true
    },
    numberOfItems: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    companyId: {
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    pics: [{
        type: Schema.Types.ObjectId,
        ref: 'BikePics'
    }]
}, {
    timestamps: true
});
module.exports = mongoose.model('Bike', BikeSchema);