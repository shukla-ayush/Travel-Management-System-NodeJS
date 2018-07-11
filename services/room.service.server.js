module.exports = function (app) {
    app.get('/api/room', findAllRooms);
    app.get('/api/room/:roomId', findRoomById);
    app.post('/api/room', createRoom);
    app.put('/api/room/:roomId', updateRoom);
    app.get('/api/hotel/:hotelId/room', findRoomsForHotel);
    app.delete('/api/room/:roomId', deleteRoom);

    var roomModel = require('../models/room/room.model.server');

    function findRoomById(req, res) {
        var id = req.params['roomId'];
        roomModel.findRoomById(id)
            .then(function (room) {
                res.json(room);
            })
    }

    function findAllRooms(req, res) {
        roomModel.findAllRooms()
            .then(function (rooms) {
                res.send(rooms);
            })
    }

    function findRoomsForHotel(req, res) {
        var hotelId = req.params['hotelId'];
        roomModel
            .findRoomsForHotel(hotelId)
            .then(function (rooms) {
                res.json(rooms);
            })
    }

    function createRoom(req, res) {
        var room = req.body;
        roomModel.createRoom(room)
            .then(function (room) {
                res.json(room);
            })
    }

    function updateRoom(req, res) {
        var room = req.body;
        roomModel.updateRoom(room);
        res.send(200);
    }

    function deleteRoom(req, res) {
        var roomId = req.params['roomId'];
        roomModel.deleteRoom(roomId)
            .then(function (rooms) {
                res.json(rooms);
            })
    }
}