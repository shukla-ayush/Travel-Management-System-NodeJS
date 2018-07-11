var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel', restaurantSchema);

function findRestaurantById(restaurantId) {
    return restaurantModel.findById(restaurantId);
}

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}
function deleteRestaurant(restaurantId) {
    return restaurantModel.remove({_id: restaurantId})
}
function findRestaurantByOwnerId(ownerId) {
    return restaurantModel.find({owners: ownerId});
}
function updateRestaurant(newRestaurant) {
    restaurantModel.findById(newRestaurant._id, function (err, restaurant) {
        restaurant.name = newRestaurant.name;
        restaurant.address = newRestaurant.address;
        restaurant.city = newRestaurant.city;
        restaurant.phone = newRestaurant.phone;
        restaurant.price = newRestaurant.price;
        restaurant.save(function (err) {
            if (err) throw err;
        });
    });
}

function findRestaurantByCity(city) {
    return restaurantModel.find({city:{'$regex' : city, '$options' : 'i'}})
}

function findRestaurantByName(name) {
    return restaurantModel.find({name:{'$regex' : name, '$options' : 'i'}})
}

function findAllRestaurants() {
    return restaurantModel.find();
}

var api = {
    createRestaurant: createRestaurant,
    deleteRestaurant: deleteRestaurant,
    updateRestaurant: updateRestaurant,
    findAllRestaurants: findAllRestaurants,
    findRestaurantById: findRestaurantById,
    findRestaurantByName: findRestaurantByName,
    findRestaurantByOwnerId: findRestaurantByOwnerId,
    findRestaurantByCity: findRestaurantByCity
};

module.exports = api;