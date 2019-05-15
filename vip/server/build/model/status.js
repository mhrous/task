"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Status = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StatusSchema = new _mongoose.default.Schema({
  driver: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'driver',
    unique: true
  },
  place: {
    type: String,
    enum: ['دمشق', 'بيروت', ' '],
    default: ' '
  },
  go: {
    type: Boolean,
    default: false
  },
  back: {
    type: Boolean,
    default: false
  }
});

const Status = _mongoose.default.model('statu', StatusSchema);

exports.Status = Status;