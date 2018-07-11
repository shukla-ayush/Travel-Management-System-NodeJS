var mongoose = require('mongoose');
var couponSchema = require('./coupon.schema.server');
var couponModel = mongoose.model('CouponModel', couponSchema);

function createCoupon(coupon) {
    return couponModel.create(coupon);
}

function updateCoupon(newCoupon) {
    couponModel.findById(newCoupon._id, function (err, coupon) {
        coupon.code = newCoupon.code;
        coupon.value = newCoupon.value;
        coupon.save(function (err) {
            if (err) throw err;
        });
    });
}

function deleteCoupon(couponId) {
    return couponModel.remove({_id: couponId})
}

function findAllCoupons() {
    return couponModel.find();
}

function findCouponById(couponId) {
    return couponModel.findById(couponId);
}

function findCouponByHotelId(hotelId) {
    return couponModel.find({hotel: hotelId});
}

module.exports = {
    createCoupon: createCoupon,
    updateCoupon: updateCoupon,
    deleteCoupon: deleteCoupon,
    findAllCoupons: findAllCoupons,
    findCouponByHotelId: findCouponByHotelId,
    findCouponById: findCouponById
};