var mongoose = require('mongoose');
var ownersSchema = require('./owners.schema.server');
var ownersModel = mongoose.model('OwnerModel', ownersSchema);

function findOwnerByCredentials(credentials) {
    return ownersModel.findOne(credentials, {username: 1});
}

function findOwnerById(ownerId) {
    return ownerModel.findById(ownerId);
}

function createOwner(owner) {
    return ownersModel.create(owner);
}

function updateOwner(newOwner) {
    ownersModel.findById(newOwner._id, function (err, owner) {
        owner.username = newOwner.username;
        owner.lastName = newOwner.lastName;
        owner.firstName = newOwner.firstName;
        owner.email = newOwner.email;
        owner.address = newOwner.address;
        owner.phoneNumber = newOwner.phoneNumber;
        owner.typeOfBusiness = newOwner.typeOfBusiness;
        owner.businessName = newOwner.businessName;
        owner.save(function (err) {
            if (err) throw err;
        });
    });
}

function findOwnerByOwnername(username) {
    return ownersModel.count({username: username});
}

function findAllOwners() {
    return ownersModel.find();
}

var api = {
    createOwner: createOwner,
    updateOwner: updateOwner,
    findAllOwners: findAllOwners,
    findOwnerById: findOwnerById,
    findOwnerByCredentials: findOwnerByCredentials,
    findOwnerByOwnername: findOwnerByOwnername,
};

module.exports = api;