"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Partner = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const partnerSchema = new _mongoose.default.Schema({
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

const Partner = _mongoose.default.model('partner', partnerSchema);

exports.Partner = Partner;