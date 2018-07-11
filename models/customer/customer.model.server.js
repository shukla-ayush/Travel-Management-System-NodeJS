var mongoose = require('mongoose');
var customerSchema = require('./customer.schema.server');
var customerModel = mongoose.model('CustomerModel', customerSchema);

function createCustomer(customer) {
    return customerModel.create(customer);
}

function updateCustomer(newCustomer) {
    customerModel.findOne({_id : newCustomer._id}, function (err, customer) {
        console.log(customer);
        customer.password = newCustomer.password;
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

function deleteCustomer(customerId) {
    return customerModel.remove({_id: customerId})
}

function findCustomerByCredentials(credentials) {
    return customerModel.findOne(credentials);
}

function findCustomerById(customerId) {
    return customerModel.find({_id : customerId});
}

function findCustomerByUsername(username) {
    return customerModel.count({username: username});
}
function findCustomerByName(username) {
    return customerModel.find({username: username});
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
    findCustomerByName: findCustomerByName,
    deleteCustomer: deleteCustomer
};

module.exports = api;