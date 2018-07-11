module.exports = function (app) {

    app.get('/api/hotel', findAllHotels);
    app.get('/api/hotel/:hotelId', findHotelById);
    app.get('/api/hotel/owner/:ownerId', findHotelByOwnerId);
    app.post('/api/hotel', createHotel);
    app.get('/api/hotel/city/:city', findHotelByCity);
    app.put('/api/hotel/:hotelId', updateHotel);
    app.delete('/api/hotel/:hotelId', deleteHotel);

    var hotelModel = require('../models/hotel/hotel.model.server');
    var ownerModel = require('../models/owners/owners.model.server');

    function createHotel(req, res) {
        var hotel = req.body;
        var ownerId = hotel.owners
        ownerModel.findOwnerById(ownerId)
            .then(function(owner){
                req.session['currentUser'] = owner[0];
            });
        hotelModel.createHotel(hotel)
            .then(function (hotel) {
                res.json(hotel);
            });

    }
    function findHotelByOwnerId(req, res) {
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        var id = req.params['ownerId'];
        hotelModel.findHotelByOwnerId(id)
            .then(function (hotel) {
                res.json(hotel);
            })
    }
    function updateHotel(req, res) {
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        var hotel = req.body;
        hotelModel.updateHotel(hotel);
        res.send(200);
    }

    function deleteHotel(req, res) {
        var hotelId = req.params['hotelId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        hotelModel.deleteHotel(hotelId)
            .then(function (hotels) {
                res.json(hotels);
            })
    }

    function findAllHotels(req, res) {
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        hotelModel.findAllHotels()
            .then(function (hotels) {
                res.send(hotels);
            })
    }

    function findHotelById(req, res) {
        var id = req.params['hotelId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        hotelModel.findHotelById(id)
            .then(function (hotel) {
                res.json(hotel);
            })
    }

    function findHotelByCity(req, res) {
        var city = req.params['city'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        hotelModel.findHotelByCity(city)
            .then(function (hotel) {
                res.json(hotel);
            })
    }
};