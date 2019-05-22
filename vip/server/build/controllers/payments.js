"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllPaymentForDriverInMonth = exports.putPayment = exports.deletePayment = exports.addPayment = void 0;

var _model = require("../model");

var _utils = require("../utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const addPayment = async (req, res) => {
  try {
    const {
      partner,
      driver,
      amount,
      date
    } = req.body;

    if (!driver || !driver) {
      return res.status(401).json({
        informtion: 'يرجى ادخال السيارة'
      });
    }

    if (amount === '') {
      return res.status(401).json({
        amount: 'يجب ادخال قيمة الدفعة'
      });
    }

    if (date === '') {
      return res.status(401).json({
        date: 'يجب ادخال تاريخ الدفعة'
      });
    }

    const data = await _model.Payment.create({
      partner,
      driver,
      amount,
      date
    });
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.addPayment = addPayment;

const deletePayment = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await _model.Payment.findByIdAndRemove(id).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.deletePayment = deletePayment;

const putPayment = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      body
    } = req;
    const data = await _model.Payment.findByIdAndUpdate(id, _objectSpread({
      partner: null,
      driver: null
    }, body), {
      new: true
    }).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.putPayment = putPayment;

const getAllPaymentForDriverInMonth = async (req, res) => {
  try {
    const {
      driverId: driver,
      month,
      year
    } = req.params;
    const start = (0, _utils.getFirstOfThisMonth)(month, year);
    const end = (0, _utils.getFirstOfNextMonth)(month, year);
    const data = await _model.Payment.find({
      driver,
      date: {
        $lte: end,
        $gte: start
      }
    });
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getAllPaymentForDriverInMonth = getAllPaymentForDriverInMonth;