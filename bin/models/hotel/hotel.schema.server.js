var mongoose = require('mongoose');

var hotelSchema = mongoose.Schema({
    property_name: String,
    descriptions: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    address: {
        line1: String,
        city: String,
        region: String,
        postal_code: Number,
        country: String
    },
    total_price: {
        amount: Number,
        currency: String
    },
    contacts: {
        type: ['PHONE', 'FAX', 'EMAIL', 'URL'],
        detail: String
    },
    amenity: ['COFFEE_SHOP', 'GIFT_SHOP', 'JACUZZI', 'LAUNDRY_SERVICE'
        , 'POOL', 'PARKING', 'RESTAURANT', 'SALON', 'BARS'],
    rooms: {
        rates: {
            start_date: Date,
            end_date: Date,
            currency_code: String,
            price: Number
        }
    }
}, {collection: 'hotel'});

module.exports = hotelSchema;