module.exports = function (app) {
    app.get('/api/owner', findAllOwners);
    app.get('/api/owner/:ownerId', findOwnerById);
    app.post('/api/owner', createOwner);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/owner', updateOwner);

    var ownerModel = require('../models/owner/owner.model.server');

    function login(req, res) {
        var credentials = req.body;
        ownerModel
            .findOwnerByCredentials(credentials)
            .then(function(owner) {
                req.session['currentowner'] = owner;
                res.json(owner);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findOwnerById(req, res) {
        var id = req.params['ownerId'];
        ownerModel.findOwnerById(id)
            .then(function (owner) {
                res.json(owner);
            })
    }

    function profile(req, res) {
        var owner = req.session['currentowner'];
        if (owner == null){
            res.sendStatus(403);
        }
        else {
            ownerModel.findOwnerById(owner._id)
                .then(function (owner) {
                    res.json(owner);
                })
        }
    }

    function createOwner(req, res) {
        var owner = req.body;
        ownerModel.findOwnerByOwnername(owner.username)
            .then(function (count) {
                if(count === 0){
                    ownerModel.createOwner(owner)
                        .then(function (owner) {
                            req.session['currentowner'] = owner;
                            res.send(owner);
                        })
                }
                else{
                    res.send({Status: "Username Taken"});
                }
            });
    }
    function updateOwner(req, res) {
        var owner = req.body;
        ownerModel.updateOwner(owner);
        res.send(200);
    }

    function findAllOwners(req, res) {
        ownerModel.findAllOwners()
            .then(function (owners) {
                res.send(owners);
            })
    }
}
