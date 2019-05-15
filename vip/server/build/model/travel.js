"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Travel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const travelSchema = new _mongoose.default.Schema({
  car: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'car',
    required: true
  },
  driver: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'driver',
    required: true
  },
  partnerTo: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'partner'
  },
  partnerBack: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'partner'
  },
  date: {
    type: Date,
    required: true
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  clientName: {
    type: String
  },
  clientPhone: {
    type: String
  },
  notes: {
    type: [{
      type: String
    }],
    default: []
  },
  totalTo: {
    type: Number,
    required: true,
    default: 0
  },
  totalBack: {
    type: Number,
    required: true,
    default: 0
  },
  expenses: {
    type: Map,
    of: Number
  }
}, {
  timestamps: true
});

const Travel = _mongoose.default.model('travel', travelSchema);

exports.Travel = Travel;