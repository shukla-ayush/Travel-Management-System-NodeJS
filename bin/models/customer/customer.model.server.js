var mongoose = require('mongoose');
var customerSchema = require('./customer.schema.server');
var customerModel = mongoose.model('CustomerModel', customerSchema);

function findCustomerByCredentials(credentials) {
    return customerModel.findOne(credentials, {username: 1, password: 1});
}

function findCustomerById(customerId) {
    return customerModel.findById(customerId);
}

function createCustomer(customer) {
    return customerModel.create(customer);
}

function updateCustomer(newCustomer) {
    customerModel.findById(newCustomer._id, function (err, customer) {
        customer.username = newCustomer.username;
        customer.lastName = newCustomer.lastName;
        customer.firstName = newCustomer.firstName;
        customer.dateOfBirth = newCustomer.dateOfBirth;
        customer.email = newCustomer.email;
        customer.address = newCustomer.address;
        customer.phoneNumber = newCustomer.phoneNumber;
        customer.save(function (err) {
            if (err) throw err;
        });
    });
}

function findCustomerByUsername(username) {
    return customerModel.count({username: username});
}

function findAllCustomers() {
    return customerModel.find();
}

var api = {
    createCustomer: createCustomer,
    updateCustomer: updateCustomer,
    findAllCustomers: findAllCustomers,
    findCustomerById: findCustomerById,
    findCustomerByCredentials: findCustomerByCredentials,
    findCustomerByUsername: findCustomerByUsername,
};

module.exports = api;