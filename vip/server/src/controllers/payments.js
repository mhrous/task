import { Payment } from '../model';

import { getFirstOfNextMonth, getFirstOfThisMonth } from '../utils';

export const addPayment = async (req, res) => {
  try {
    const { partner, driver, amount, date } = req.body;
    if (!driver || !driver) {
      return res.status(401).json({
        informtion: 'يرجى ادخال السيارة'
      });
    }

    if (amount === '') {
      return res.status(401).json({
        amount: 'يجب ادخال قيمة الدفعة'
      });
    }
    if (date === '') {
      return res.status(401).json({
        date: 'يجب ادخال تاريخ الدفعة'
      });
    }

    const data = await Payment.create({
      partner,
      driver,
      amount,
      date
    });

    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Payment.findByIdAndRemove(id)
      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const putPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await Payment.findByIdAndUpdate(
      id,
      {
        partner: null,
        driver: null,
        ...body
      },
      {
        new: true
      }
    )

      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllPaymentForDriverInMonth = async (req, res) => {
  try {
    const { driverId: driver, month, year } = req.params;

    const start = getFirstOfThisMonth(month, year);

    const end = getFirstOfNextMonth(month, year);
    const data = await Payment.find({
      driver,
      date: {
        $lte: end,
        $gte: start
      }
    });

    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

