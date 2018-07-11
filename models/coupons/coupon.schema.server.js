var mongoose = require('mongoose');

var couponSchema = mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HotelModel'
    },
    code: String,
    value: Number,
}, {collection: 'coupon'});

module.exports = couponSchema;