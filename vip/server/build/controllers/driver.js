"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDriver = exports.getDriverWithCar = exports.addNewDriver = exports.getALLDriverName = exports.getALLDriver = void 0;

var _model = require("../model");

const getALLDriver = async (req, res) => {
  try {
    const data = await _model.Driver.find({
      active: true
    }).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLDriver = getALLDriver;

const getALLDriverName = async (req, res) => {
  try {
    const data = await _model.Driver.find({
      active: true
    }).select('name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLDriverName = getALLDriverName;

const addNewDriver = async (req, res) => {
  const {
    name,
    car
  } = req.body;

  if (!name) {
    return res.status(401).send({
      name: 'يجب ادخال اسم السائق'
    });
  }

  if (!car) {
    return res.status(401).send({
      car: 'يجب ادخال اسم السيارة التي يعنل عليها'
    });
  }

  try {
    let driver = await _model.Driver.findOne({
      name
    }).lean().exec();

    if (driver) {
      return res.status(401).json({
        name: ' السائق موجود مسبقا اذا رغبت بتعديل معلوماته يمكنك تعديلها من صفحته'
      });
    }

    driver = await _model.Driver.findOne({
      car
    }).lean().exec();

    if (driver) {
      return res.status(401).json({
        car: `هذه السيارة تابعة ${driver.name} `
      });
    }

    const data = await _model.Driver.create(req.body);
    await _model.Status.create({
      driver: data._id
    });
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

exports.addNewDriver = addNewDriver;

const getDriverWithCar = async (req, res) => {
  try {
    const data = await _model.Driver.find({}).populate('car', 'name number').select('name').lean().exec();
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

exports.getDriverWithCar = getDriverWithCar;

const getDriver = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await _model.Driver.findById(id).populate('car', 'name number expensesMax').lean().exec();
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

exports.getDriver = getDriver;