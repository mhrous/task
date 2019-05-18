"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signIn = exports.signUp = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _model = require("../model");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newToken = user => {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt);
};

exports.newToken = newToken;

const verifyToken = token => new Promise((resolve, reject) => {
  _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

exports.verifyToken = verifyToken;

const signUp = async (req, res) => {
  const {
    name,
    password
  } = req.body;

  if (!name) {
    return res.status(400).send({
      name: 'يجب ادخال اسم المستخدم'
    });
  }

  if (!password) {
    return res.status(400).send({
      password: 'يجب ادخال كلمة السر'
    });
  }

  try {
    const user = await _model.User.findOne({
      name
    }).lean().exec();

    if (user) {
      return res.status(401).json({
        name: ' اسم المستخدم موجود مسبقا'
      });
    }

    const newUser = await _model.User.create({
      name,
      password
    });
    const token = newToken(newUser);
    return res.status(201).send(token);
  } catch (e) {
    res.status(500).end();
  }
};

exports.signUp = signUp;

const signIn = async (req, res) => {
  const {
    name,
    password
  } = req.body;

  if (!name) {
    return res.status(400).send({
      name: 'يجب ادخال اسم المستخدم'
    });
  }

  if (!password) {
    return res.status(400).send({
      password: 'يجب ادخال كلمة السر'
    });
  }

  try {
    const user = await _model.User.findOne({
      name
    }).select('name password').exec();

    if (!user) {
      return res.status(401).send({
        name: 'هذا المستخدم غير موجود'
      });
    }

    if (req.body.password != user.password) {
      return res.status(401).send({
        password: 'كلمة السر خاطئة'
      });
    }

    const token = newToken(user);
    return res.status(201).send(token);
  } catch (e) {
    res.status(500).end();
  }
};

exports.signIn = signIn;

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;

  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await _model.User.findById(payload.id).select('-password').lean().exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};

exports.protect = protect;