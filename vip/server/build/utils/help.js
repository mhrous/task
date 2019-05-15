"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstOfNextMonth = exports.getFirstOfThisMonth = exports.getEndDate = exports.getStartDate = void 0;

const getStartDate = () => {
  const date = new Date();

  if (date.getHours() < 6) {
    date.setDate(date.getDate() - 1);
  }

  date.setHours(6, 0, 0, 0);
  return date;
};

exports.getStartDate = getStartDate;

const getEndDate = () => {
  const date = new Date();

  if (date.getHours() < 6) {
    return date.setHours(6, 0, 0, 0);
  }

  date.setDate(date.getDate() + 1);
  date.setHours(6, 0, 0, 0);
  return date;
};

exports.getEndDate = getEndDate;

const getFirstOfThisMonth = (m, y = new Date().getFullYear()) => {
  return new Date(y, parseInt(m), 1, 0, 0, 0, 0);
};

exports.getFirstOfThisMonth = getFirstOfThisMonth;

const getFirstOfNextMonth = (m, y = new Date().getFullYear()) => {
  return new Date(y, parseInt(m) + 1, 1, 0, 0, 0, 0);
};

exports.getFirstOfNextMonth = getFirstOfNextMonth;