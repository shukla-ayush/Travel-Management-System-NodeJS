var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    address: String,
    phoneNumber: String
}, {collection: 'customer'});

module.exports = customerSchema;

