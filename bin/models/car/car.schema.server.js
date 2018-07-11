var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
    provider: {
        company_name: String,
    },
    description: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    address: {
        line1: String,
        city: String,
        region: String,
        country: String
    },
    cars: [{
        vehicle_info: {
            transmission: String,
            fuel: String,
            air_conditioning: String,
            category: String,
            type: String
        },
    rates: {
        price : {
            type: String,
            amount: String,
            currency: String
        }
    }}]
}, {collection: 'car'});

module.exports = carSchema;