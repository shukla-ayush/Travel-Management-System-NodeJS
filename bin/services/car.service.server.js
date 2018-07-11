module.exports = function (app) {
    app.get('/api/car', findAllCars);
    app.get('/api/car/:carId', findCarById);
    app.post('/api/car', createCar);
    // app.get('/api/profile', profile);
    // app.post('/api/logout', logout);
    // app.post('/api/login', login);
    app.put('/api/car', updateCar);

    var carModel = require('../models/car/car.model.server');

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

    function findCarById(req, res) {
        var id = req.params['carId'];
        carModel.findCarById(id)
            .then(function (car) {
                res.json(car);
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

    function createCar(req, res) {
        var car = req.body;
        // carModel.findCarByPropertyName(car.property_name)
        //     .then(function (count) {
        //         if(count === 0){
                    carModel.createCar(car)
                        .then(function (car) {
                            req.session['currentCar'] = car;
                            res.send(car);
                        })
                // }
                // else{
                //     res.send({Status: "Property name is taken"});
                // }
            }

    function updateCar(req, res) {
        var car = req.body;
        carModel.updateCar(car);
        res.send(200);
    }

    function findAllCars(req, res) {
        carModel.findAllCars()
            .then(function (cars) {
                res.send(cars);
            })
    }
}
