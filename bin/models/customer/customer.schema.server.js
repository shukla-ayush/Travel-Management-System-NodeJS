var mongoose = require('mongoose');

var ownersSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    address: String,
    phoneNumber: String
}, {collection: 'owners'});

module.exports = ownersSchema;