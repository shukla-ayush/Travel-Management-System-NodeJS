var mongoose = require('mongoose');

var restaurantSchema = mongoose.Schema({
    id: Number,
    name: String,
    address: String,
    city: String,
    state: String,
    area: String,
    postal_code: Number,
    country: String,
    phone: Number,
    price: Number,
    reserve_url: String,
    image_url: String
}, {collection: 'restaurant'});

module.exports = restaurantSchema;