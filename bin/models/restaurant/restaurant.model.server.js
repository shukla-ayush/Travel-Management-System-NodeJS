var mongoose = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server');
var restaurantModel = mongoose.model('RestaurantModel', restaurantSchema);

function findRestaurantById(restaurantId) {
    return restaurantModel.findById(restaurantId);
}

function createRestaurant(restaurant) {
    return restaurantModel.create(restaurant);
}

function updateRestaurant(newRestaurant) {
    restaurantModel.findById(newRestaurant._id, function (err, restaurant) {
        restaurant.id = newRestaurant.id;
        restaurant.name = newRestaurant.name;
        restaurant.address = newRestaurant.address;
        restaurant.city = newRestaurant.city;
        restaurant.state = newRestaurant.state;
        restaurant.area = newRestaurant.area;
        restaurant.postal_code = newRestaurant.postal_code;
        restaurant.country = newRestaurant.country;
        restaurant.phone = newRestaurant.phone;
        restaurant.price = newRestaurant.price;
        restaurant.reserve_url = newRestaurant.reserve_url;
        restaurant.image_url = newRestaurant.image_url;
        restaurant.save(function (err) {
            if (err) throw err;
        });
    });
}

function findRestaurantByName(name) {
    return restaurantModel.count({name: name});
}

function findAllRestaurants() {
    return restaurantModel.find();
}

var api = {
    createRestaurant: createRestaurant,
    updateRestaurant: updateRestaurant,
    findAllRestaurants: findAllRestaurants,
    findRestaurantById: findRestaurantById,
    findRestaurantByName: findRestaurantByName,
};

module.exports = api;