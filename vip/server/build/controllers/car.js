"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewCar = exports.getALLCarNumberName = exports.getCar = exports.getALLCar = void 0;

var _model = require("../model");

const getALLCar = async (req, res) => {
  try {
    const data = await _model.Car.find({
      active: true
    }).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLCar = getALLCar;

const getCar = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await _model.Car.findById(id).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getCar = getCar;

const getALLCarNumberName = async (req, res) => {
  try {
    const data = await _model.Car.find({
      active: true
    }).select('name number').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLCarNumberName = getALLCarNumberName;

const addNewCar = async (req, res) => {
  const {
    number,
    expensesMax,
    name
  } = req.body;

  if (!number) {
    return res.status(400).send({
      number: 'يجب ادخال رقم السيارة'
    });
  }

  if (!name) {
    return res.status(400).send({
      name: 'يجب ادخال نوع السيارة'
    });
  }

  if (!expensesMax) {
    return res.status(400).send({
      expensesMax: 'يجب المصروف الاعظمي '
    });
  }

  try {
    const car = await _model.Car.findOne({
      number
    }).lean().exec();

    if (car) {
      return res.status(401).json({
        number: ' السيارة موجودة مسبقا اذا رغبت بتعديل معلوماتها يمكنك تعديلها من صفحتها'
      });
    }

    const data = await _model.Car.create(req.body);
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

exports.addNewCar = addNewCar;