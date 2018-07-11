var mongoose = require('mongoose');

var hotelSchema = mongoose.Schema({
    owners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OwnerModel'
    },
    name: String,
    address: String,
    phone: String,
    customers: [String],
    rate: String
}, {collection: 'hotel'});

module.exports = hotelSchema;