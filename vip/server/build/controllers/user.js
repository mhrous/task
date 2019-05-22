"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.me = void 0;

var _model = require("../model");

const me = (req, res) => {
  res.status(200).json({
    data: req.user
  });
};

exports.me = me;

const updateUser = async (req, res) => {
  try {
    const user = await _model.User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    }).lean().exec();
    res.status(200).json({
      data: user
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.updateUser = updateUser;