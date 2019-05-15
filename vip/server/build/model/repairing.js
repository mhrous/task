"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Repairing = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const repairingSchema = new _mongoose.default.Schema({
  car: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'car',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const Repairing = _mongoose.default.model('repairing', repairingSchema);

exports.Repairing = Repairing;