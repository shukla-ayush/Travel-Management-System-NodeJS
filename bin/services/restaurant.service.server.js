module.exports = function (app) {
    app.get('/api/restaurant', findAllRestaurants);
    app.get('/api/restaurant/:restaurantId', findRestaurantById);
    app.post('/api/restaurant', createRestaurant);
    // app.get('/api/profile', profile);
    // app.post('/api/logout', logout);
    // app.post('/api/login', login);
    app.put('/api/restaurant', updateRestaurant);

    var restaurantModel = require('../models/restaurant/restaurant.model.server');

    // function login(req, res) {
    //     var credentials = req.body;
    //     ownerModel
    //         .findOwnerByCredentials(credentials)
    //         .then(function(owner) {
    //             req.session['currentowner'] = owner;
    //             res.json(owner);
    //         })
    // }

    // function logout(req, res) {
    //     req.session.destroy();
    //     res.send(200);
    // }

    function findRestaurantById(req, res) {
        var id = req.params['restaurantId'];
        restaurantModel.findRestaurantById(id)
            .then(function (restaurant) {
                res.json(restaurant);
            })
    }

    // function profile(req, res) {
    //     var owner = req.session['currentowner'];
    //     if (owner == null){
    //         res.sendStatus(403);
    //     }
    //     else {
    //         ownerModel.findOwnerById(owner._id)
    //             .then(function (owner) {
    //                 res.json(owner);
    //             })
    //     }
    // }

    function createRestaurant(req, res) {
        var restaurant = req.body;
        restaurantModel.findRestaurantByName(restaurant.name)
            .then(function (count) {
                if(count === 0){
                    restaurantModel.createRestaurant(restaurant)
                        .then(function (restaurant) {
                            req.session['currentRestaurant'] = restaurant;
                            res.send(restaurant);
                        })
                }
                else{
                    res.send({Status: "Restaurant name is taken"});
                }
            });
    }
    function updateRestaurant(req, res) {
        var restaurant = req.body;
        restaurantModel.updateRestaurant(restaurant);
        res.send(200);
    }

    function findAllRestaurants(req, res) {
        restaurantModel.findAllRestaurants()
            .then(function (restaurants) {
                res.send(restaurants);
            })
    }
}
