module.exports = function (app) {
    app.get('/api/coupon', findAllCoupons);
    app.get('/api/coupon/:couponId', findCouponById);
    app.get('/api/coupon/hotel/:hotelId', findCouponByHotelId);
    app.post('/api/coupon', createCoupon);
    app.put('/api/coupon/:couponId', updateCoupon);
    app.delete('/api/coupon/:couponId', deleteCoupon);


    var couponModel = require('../models/coupons/coupon.model.server');

    function findCouponById(req, res) {
        var id = req.params['couponId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        couponModel.findCouponById(id)
            .then(function (coupon) {
                res.json(coupon);
            })
    }

    function deleteCoupon(req, res) {
        var couponId = req.params['couponId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        couponModel.deleteCoupon(couponId)
            .then(function (coupons) {
                res.json(coupons);
            })
    }

    function createCoupon(req, res) {
        var coupon = req.body;
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        couponModel.createCoupon(coupon)
            .then(function (coupon) {
                res.json(coupon);
            })
    }

    function updateCoupon(req, res) {
        var coupon = req.body;
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        couponModel.updateCoupon(coupon);
        res.send(200);
    }

    function findAllCoupons(req, res) {
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        couponModel.findAllCoupons()
            .then(function (coupons) {
                res.send(coupons);
            })
    }
    function findCouponByHotelId(req, res) {
        var id = req.params['hotelId'];
        var customer = req.session['currentUser'];
        req.session['currentUser'] = customer;
        console.log(id);
        couponModel.findCouponByHotelId(id)
            .then(function (coupon) {
                res.json(coupon);
            })
    }
}
