"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

const router = (0, _express.Router)();
router.get('/partner', _controllers.getALLPartnerName);
router.get('/car', _controllers.getALLCarNumberName);
router.get('/driver', _controllers.getALLDriverName);
router.get('/status', _controllers.getStatus);
router.put('/status/:id', _controllers.updateStatus);
router.get('/travel', _controllers.getDayTravel);
router.post('/travel', _controllers.addTravel);
router.put('/travel/:id', _controllers.putTravel);
router.delete('/travel/:id', _controllers.deleteTravel);
router.get('/driver/car', _controllers.getDriverWithCar);
var _default = router;
exports.default = _default;