"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addNewPartner = exports.getALLPartnerName = exports.getALLPartner = void 0;

var _model = require("../model");

const getALLPartner = async (req, res) => {
  try {
    const data = await _model.Partner.find({
      active: true
    }).lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLPartner = getALLPartner;

const getALLPartnerName = async (req, res) => {
  try {
    const data = await _model.Partner.find({
      active: true
    }).select('name').lean().exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

exports.getALLPartnerName = getALLPartnerName;

const addNewPartner = async (req, res) => {
  const {
    name
  } = req.body;

  if (!name) {
    return res.status(400).send({
      name: 'يجب ادخال اسم الشريك'
    });
  }

  try {
    const partner = await _model.Partner.findOne({
      name
    }).lean().exec();

    if (partner) {
      return res.status(401).json({
        name: ' الشريك موجود مسبقا اذا رغبت بتعديل معلوماته يمكنك تعديلها من صفحته'
      });
    }

    const data = await _model.Partner.create(req.body);
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

exports.addNewPartner = addNewPartner;