var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    owners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OwnerModel'
    },
    address: String,
    transmission: String,
    fuel: String,
    air_conditioning: String,
    category: String,
    type: String,
    rate: String,
    start_date:  Date,
    end_date: Date
}, {collection: 'car'});

module.exports = carSchema;