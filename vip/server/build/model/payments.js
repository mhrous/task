"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentSchema = new _mongoose.default.Schema({
  partner: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'partner'
  },
  driver: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'driver'
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['مدفوع', 'مقبوض'],
    default: 'مقبوض'
  }
});

const Payment = _mongoose.default.model('payment', paymentSchema);

exports.Payment = Payment;