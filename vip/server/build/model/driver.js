"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Driver = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const driverSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    unique: true
  },
  phone: {
    type: Map,
    of: String
  },
  address: {
    type: String
  },
  rest: {
    type: Number,
    default: 0
  },
  last: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: [{
      type: String
    }],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  },
  car: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'car',
    unique: true
  }
});

const Driver = _mongoose.default.model('driver', driverSchema);

exports.Driver = Driver;