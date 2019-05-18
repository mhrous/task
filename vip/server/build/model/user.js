"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 4
  }
});

const User = _mongoose.default.model('user', userSchema);

exports.User = User;