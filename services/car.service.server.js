module.exports = function (app) {
    app.get('/api/car', findAllCars);
    app.get('/api/car/:carId', findCarById);
    app.get('/api/car/owner/:ownerId', findCarByOwnerId);
    app.post('/api/car', createCar);
    app.get('/api/car/location/:location', findCarByLocation);
    // app.get('/api/car/dates/:start-date/:end-date', findCarByDates);
    app.put('/api/car/:carId', updateCar);
    app.delete('/api/car/:carId', deleteCar);


    var carModel = require('../models/car/car.model.server');
    var ownerModel = require('../models/owners/owners.model.server');

    function findCarById(req, res) {
        var id = req.params['carId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;

        carModel.findCarById(id)
            .then(function (car) {
                res.json(car);
            })
    }

    function deleteCar(req, res) {
        var carId = req.params['carId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;

        carModel.deleteCar(carId)
            .then(function (cars) {
                res.json(cars);
            })
    }

    function createCar(req, res) {
        var car = req.body;
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        var ownerId = car.owners
        ownerModel.findOwnerById(ownerId)
            .then(function(owner){
                req.session['currentUser'] = owner[0];
            });
        carModel.createCar(car)
            .then(function (car) {
                res.json(car);
            })
    }

    function updateCar(req, res) {
        var car = req.body;
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        carModel.updateCar(car);
        res.send(200);
    }

    function findAllCars(req, res) {
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        carModel.findAllCars()
            .then(function (cars) {
                res.send(cars);
            })
    }
    function findCarByOwnerId(req, res) {
        var id = req.params['ownerId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        carModel.findCarByOwnerId(id)
            .then(function (car) {
                res.json(car);
            })
    }

    function findCarByLocation(req, res) {
        var location = req.params['location'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        carModel.findCarByLocation(location)
            .then(function (car) {
                res.json(car);
            })
    }

}
