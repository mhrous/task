"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStatus = exports.getStatus = void 0;

var _model = require("../model");

var _utils = require("../utils");

const getStatus = async (req, res) => {
  try {
    const lastUpdate = await _model.Setting.findOne({
      name: 'lastUpdateStatus'
    }).lean().exec();
    const start = (0, _utils.getStartDate)();

    if (!lastUpdate || start.getTime() > lastUpdate.value.getTime()) {
      if (!lastUpdate) {
        await _model.Setting.create({
          name: 'lastUpdateStatus',
          value: Date.now()
        });
      } else {
        await _model.Setting.findOneAndUpdate({
          name: 'lastUpdateStatus'
        }, {
          value: Date.now()
        });
      }

      const drivers = await _model.Driver.find({
        active: true
      }).select('_id').lean().exec();
      const driverId = drivers.map(e => e._id.toString());
      await _model.Status.find({}).deleteMany().lean().exec();
      const createObject = driverId.map(e => ({
        driver: e
      }));
      await _model.Status.create(createObject);
      const data = await _model.Status.find({}).populate('driver', 'name phone').lean().exec();
      res.status(200).json({
        data
      });
    } else {
      const data = await _model.Status.find({}).populate('driver', 'name phone').lean().exec();
      res.status(200).json({
        data
      });
    }
  } catch (e) {
    res.status(500).end();
  }
};

exports.getStatus = getStatus;

const updateStatus = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const data = await _model.Status.findByIdAndUpdate(id, req.body, {
      new: true
    }).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.updateStatus = updateStatus;