module.exports = function (app) {
    app.get('/api/hotel', findAllHotels);
    app.get('/api/hotel/:hotelId', findHotelById);
    app.post('/api/hotel', createHotel);
    // app.get('/api/profile', profile);
    // app.post('/api/logout', logout);
    // app.post('/api/login', login);
    app.put('/api/hotel', updateHotel);

    var hotelModel = require('../models/hotel/hotel.model.server');

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

    function findHotelById(req, res) {
        var id = req.params['hotelId'];
        hotelModel.findHotelById(id)
            .then(function (hotel) {
                res.json(hotel);
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

    function createHotel(req, res) {
        var hotel = req.body;
        hotelModel.findHotelByPropertyName(hotel.property_name)
            .then(function (count) {
                if(count === 0){
                    hotelModel.createHotel(hotel)
                        .then(function (hotel) {
                            req.session['currentHotel'] = hotel;
                            res.send(hotel);
                        })
                }
                else{
                    res.send({Status: "Property name is taken"});
                }
            });
    }
    function updateHotel(req, res) {
        var hotel = req.body;
        hotelModel.updateHotel(hotel);
        res.send(200);
    }

    function findAllHotels(req, res) {
        hotelModel.findAllHotels()
            .then(function (hotels) {
                res.send(hotels);
            })
    }
}
