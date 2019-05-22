import config from '../config';
import { User } from '../model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt);
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signUp = async (req, res) => {
  const { name, password } = req.body;
  if (!name) {
    return res.status(400).send({ name: 'يجب ادخال اسم المستخدم' });
  }
  if (!password) {
    return res.status(400).send({ password: 'يجب ادخال كلمة السر' });
  }

  try {
    const user = await User.findOne({ name })
      .lean()
      .exec();

    if (user) {
      return res.status(401).json({ name: ' اسم المستخدم موجود مسبقا' });
    }
    const newUser = await User.create({ name, password });
    const token = newToken(newUser);

    return res.status(201).send(token);
  } catch (e) {
    res.status(500).end();
  }
};

export const signIn = async (req, res) => {
  const { name, password } = req.body;
  if (!name) {
    return res.status(400).send({ name: 'يجب ادخال اسم المستخدم' });
  }
  if (!password) {
    return res.status(400).send({ password: 'يجب ادخال كلمة السر' });
  }

  try {
    const user = await User.findOne({ name })
      .select('name password')
      .exec();

    if (!user) {
      return res.status(401).send({ name: 'هذا المستخدم غير موجود' });
    }

    if (req.body.password != user.password) {
      return res.status(401).send({ password: 'كلمة السر خاطئة' });
    }

    const token = newToken(user);

    return res.status(201).send(token);
  } catch (e) {
    res.status(500).end();
  }
};

export const protect = async (req, res, next) => {
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

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
