var mongoose = require('mongoose');
var carSchema = require('./car.schema.server');
var carModel = mongoose.model('CarModel', carSchema);

function findCarById(carId) {
    return carModel.findById(carId);
}

function createCar(car) {
    return carModel.create(car);
}

function updateCar(newCar) {
    carModel.findById(newCar._id, function (err, car) {
        car.provider.company_name = newCar.provider.company_name;
        car.description = newCar.description;
        car.location.latitude = newCar.location.latitude;
        car.location.longitude = newCar.location.longitude;
        car.address.line1 = newCar.address.line1;
        car.address.city = newCar.address.city;
        car.address.region = newCar.address.region;
        car.address.country = newCar.address.country;
       car.cars.vehicle_info.transmission = newCar.cars.vehicle_info.transmission;
        car.cars.vehicle_info.fuel = newCar.cars.vehicle_info.fuel;
        car.cars.vehicle_info.air_conditioning = newCar.cars.vehicle_info.air_conditioning;
        car.cars.vehicle_info.category = newCar.cars.vehicle_info.category;
        car.cars.vehicle_info.type = newCar.cars.vehicle_info.type;
        car.rates.price.type = newCar.rates.price.type;
        car.rates.price.amount = newCar.rates.price.amount;
        car.rates.price.currency = newCar.rates.price.currency;
        car.save(function (err) {
            if (err) throw err;
        });
    });
}

// function findCarByName(name) {
//     return carModel.count({property_name: name});
// }

function findAllCars() {
    return carModel.find();
}

var api = {
    createCar: createCar,
    updateCar: updateCar,
    findAllCars: findAllCars,
    findCarById: findCarById
};

module.exports = api;