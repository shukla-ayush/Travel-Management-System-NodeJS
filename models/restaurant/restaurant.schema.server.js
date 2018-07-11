var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    owners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OwnerModel'
    },
    name: String,
    address: String,
    city: String,
    phone: String,
    price: String
}, {collection: 'restaurant'});

module.exports = restaurantSchema;