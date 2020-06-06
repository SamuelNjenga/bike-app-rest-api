const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyEmail: {
        type: String,
        required: true
    },
    bikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Bike'
    }]
}, {
    timestamps: true
});
module.exports = mongoose.model('Company', CompanySchema);