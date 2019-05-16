import { Travel } from '../model';
import {
  getStartDate,
  getEndDate,
  getFirstOfNextMonth,
  getFirstOfThisMonth
} from '../utils';

export const getDayTravel = async (req, res) => {
  try {
    const start = getStartDate();
    const end = getEndDate();

    const data = await Travel.find({
      createdAt: {
        $lte: end,
        $gte: start
      }
    })
      .populate('driver', 'name')
      .populate('partnerTo', 'name')
      .populate('partnerBack', 'name')
      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const addTravel = async (req, res) => {
  try {
    const {
      car,
      driver,
      date,
      notes,
      from,
      to,
      clientName,
      clientPhone,

      totalTo,
      totalBack,
      expenses,
      partnerTo,
      partnerBack
    } = req.body;
    if (!driver) {
      return res.status(401).json({
        driver: 'يرجى ادخال السيارة'
      });
    }
    if (!car) {
      return res.status(401).json({
        car: 'يرجى ادخال السيارة'
      });
    }
    if (expenses === '') {
      return res.status(401).json({
        expenses: 'يرجى ادخال مصروف السيارة'
      });
    }
    if (totalTo === '') {
      return res.status(401).json({
        totalTo: 'يرجى ادخال قيمة  الذهاب السفرة'
      });
    }
    if (totalBack === '') {
      return res.status(401).json({
        totalBack: 'يرجى ادخال قيمة   العودة السفرة'
      });
    }

    const newTravel = await Travel.create({
      car,
      driver,
      date,
      notes,
      from,
      to,
      clientName,
      clientPhone,
      totalTo,
      totalBack,
      expenses,
      partnerTo,
      partnerBack
    });
    const data = await Travel.findById(newTravel._id)
      .populate('driver', 'name')
      .populate('partnerTo', 'name')
      .populate('partnerBack', 'name')
      .lean()
      .exec();

    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const deleteTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Travel.findByIdAndRemove(id)
      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const putTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const data = await Travel.findByIdAndUpdate(
      id,
      {
        partnerTo: null,
        partnerBack: null,
        ...body
      },
      {
        new: true
      }
    )
      .populate('driver', 'name')
      .populate('partnerTo', 'name')
      .populate('partnerBack', 'name')
      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllTravelForDriverInMonth = async (req, res) => {
  try {
    const { driverId: driver, month, year } = req.params;

    const start = getFirstOfThisMonth(month, year);

    const end = getFirstOfNextMonth(month, year);
    const data = await Travel.find({
      driver,
      date: {
        $lte: end,
        $gte: start
      }
    })
      .populate('driver', 'name')
      .populate('partnerTo', 'name')
      .populate('partnerBack', 'name')
      .lean()
      .exec();
    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllTravelForCarInMonth = async (req, res) => {
  try {
  } catch (e) {
    res.status(400).end();
  }
};
