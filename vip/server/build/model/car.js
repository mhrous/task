"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Car = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carSchema = new _mongoose.default.Schema({
  number: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  expensesMax: {
    type: Number,
    require: true
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
  }
});

const Car = _mongoose.default.model('car', carSchema);

exports.Car = Car;