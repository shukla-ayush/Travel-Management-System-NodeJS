var mongoose = require('mongoose');

var ownersSchema = mongoose.Schema({
    businessId: String,
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    address: String,
    phoneNumber: String,
    typeOfBusiness: {
        type: String,
        enum: ['HOTEL', 'RESTAURANT', 'CAR'],
        default: 'HOTEL'
    },
    businessName: String
}, {collection: 'owners'});

module.exports = ownersSchema;