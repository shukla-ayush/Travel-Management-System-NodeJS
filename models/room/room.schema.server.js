var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    hotelId: String,
    room_type: String,
    isBooked: Boolean,
    number_of_beds: Number
}, {collection: 'room'});

module.exports = roomSchema;