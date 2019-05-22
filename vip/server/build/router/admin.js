"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

const router = (0, _express.Router)();
router.put('/admin/updata', _controllers.updateUser);
router.get('/admin/partner', _controllers.getALLPartner);
router.post('/admin/partner', _controllers.addNewPartner);
router.get('/admin/car', _controllers.getALLCar);
router.post('/admin/car', _controllers.addNewCar);
router.get('/admin/car/:id', _controllers.getCar);
router.get('/admin/driver', _controllers.getALLDriver);
router.get('/admin/driver/:id', _controllers.getDriver);
router.post('/admin/driver', _controllers.addNewDriver);
router.post('/admain/payment', _controllers.addPayment);
router.delete('/admain/payment/:id', _controllers.deletePayment);
router.put('/admain/payment/:id', _controllers.putPayment);
router.get('/admain/payment/driver/:driverId/:month/:year', _controllers.getAllPaymentForDriverInMonth);
router.get('/admin/travel/car/:carId/:month/:year', _controllers.getAllTravelForCarInMonth);
router.get('/admin/travel/driver/:driverId/:month/:year', _controllers.getAllTravelForDriverInMonth);
var _default = router;
exports.default = _default;