var mongoose = require('mongoose');
var hotelSchema = require('./hotel.schema.server');
var hotelModel = mongoose.model('HotelModel', hotelSchema);

function createHotel(hotel) {
    return hotelModel.create(hotel);
}

function updateHotel(newHotel) {
    hotelModel.findById(newHotel._id, function (err, hotel) {
        hotel.name = newHotel.name;
        hotel.address = newHotel.address;
        hotel.phone = newHotel.phone;
        hotel.customers = newHotel.customers;
        hotel.rate = newHotel.rate;
        hotel.save(function (err) {
            if (err) throw err;
        });
    });
}

function deleteHotel(hotelId) {
    return hotelModel.remove({_id: hotelId})
}

function findAllHotels() {
    return hotelModel.find();
}

function findHotelById(hotelId) {
    return hotelModel.findById(hotelId);
}

function findHotelByCity(city) {
    return hotelModel.find({address:{'$regex' : city, '$options' : 'i'}})
}

function findHotelByOwnerId(ownerId) {
    return hotelModel.find({owners: ownerId});
}

module.exports = {
    createHotel: createHotel,
    updateHotel: updateHotel,
    deleteHotel: deleteHotel,
    findAllHotels: findAllHotels,
    findHotelById: findHotelById,
    findHotelByCity: findHotelByCity,
    findHotelByOwnerId: findHotelByOwnerId
};