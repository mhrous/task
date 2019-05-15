"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Setting = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    unique: true
  },
  value: {
    type: Date,
    required: true
  }
});

const Setting = _mongoose.default.model('setting', settingSchema);

exports.Setting = Setting;