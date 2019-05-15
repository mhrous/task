"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllTravelForCarInMonth = exports.getAllTravelForDriverInMonth = exports.putTravel = exports.deleteTravel = exports.addTravel = exports.getDayTravel = void 0;

var _model = require("../model");

var _utils = require("../utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getDayTravel = async (req, res) => {
  try {
    const start = (0, _utils.getStartDate)();
    const end = (0, _utils.getEndDate)();
    const data = await _model.Travel.find({
      createdAt: {
        $lte: end,
        $gte: start
      }
    }).populate('driver', 'name').populate('partnerTo', 'name').populate('partnerBack', 'name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getDayTravel = getDayTravel;

const addTravel = async (req, res) => {
  try {
    const {
      car,
      driver,
      date,
      notes,
      from,
      to,
      clientName,
      clientPhone,
      totalTo,
      totalBack,
      expenses,
      partnerTo,
      partnerBack
    } = req.body;

    if (!driver) {
      return res.status(401).json({
        driver: 'يرجى ادخال السيارة'
      });
    }

    if (!car) {
      return res.status(401).json({
        car: 'يرجى ادخال السيارة'
      });
    }

    if (expenses === '') {
      return res.status(401).json({
        expenses: 'يرجى ادخال مصروف السيارة'
      });
    }

    if (totalTo === '') {
      return res.status(401).json({
        totalTo: 'يرجى ادخال قيمة  الذهاب السفرة'
      });
    }

    if (totalBack === '') {
      return res.status(401).json({
        totalBack: 'يرجى ادخال قيمة   العودة السفرة'
      });
    }

    const newTravel = await _model.Travel.create({
      car,
      driver,
      date,
      notes,
      from,
      to,
      clientName,
      clientPhone,
      totalTo,
      totalBack,
      expenses,
      partnerTo,
      partnerBack
    });
    const data = await _model.Travel.findById(newTravel._id).populate('driver', 'name').populate('partnerTo', 'name').populate('partnerBack', 'name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.addTravel = addTravel;

const deleteTravel = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await _model.Travel.findByIdAndRemove(id).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.deleteTravel = deleteTravel;

const putTravel = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      body
    } = req;
    const data = await _model.Travel.findByIdAndUpdate(id, _objectSpread({
      partnerTo: null,
      partnerBack: null
    }, body), {
      new: true
    }).populate('driver', 'name').populate('partnerTo', 'name').populate('partnerBack', 'name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.putTravel = putTravel;

const getAllTravelForDriverInMonth = async (req, res) => {
  try {
    const {
      driverId: driver,
      month,
      year
    } = req.params;
    const start = (0, _utils.getFirstOfThisMonth)(month, year);
    const end = (0, _utils.getFirstOfNextMonth)(month, year);
    const data = await _model.Travel.find({
      driver,
      date: {
        $lte: end,
        $gte: start
      }
    }).populate('driver', 'name').populate('partnerTo', 'name').populate('partnerBack', 'name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getAllTravelForDriverInMonth = getAllTravelForDriverInMonth;

const getAllTravelForCarInMonth = async (req, res) => {
  try {} catch (e) {
    res.status(400).end();
  }
};

exports.getAllTravelForCarInMonth = getAllTravelForCarInMonth;