import { Travel } from '../model';
import { getStartDate, getEndDate } from '../utils';

export const getDayTravel = async (req, res) => {
  try {
    const start = getStartDate();
    const end = getEndDate();
    console.log({ start, end });
    console.log(5555555555555);
    const data = await Travel.find({ createdAt: { $lte: end, $gte: start } })
      .populate('driver', 'name')
      .populate('partner', 'name')
      .lean()
      .exec();
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
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
      type,
      total,
      expenses,
      partner
    } = req.body;
    if (!driver) {
      return res.status(401).json({ driver: 'يرجى ادخال السيارة' });
    }
    if (!car) {
      return res.status(401).json({ car: 'يرجى ادخال السيارة' });
    }
    if (expenses === '') {
      return res.status(401).json({ expenses: 'يرجى ادخال مصروف السيارة' });
    }
    if (total === '') {
      return res.status(401).json({ total: 'يرجى ادخال قيمة  السفرة' });
    }
    if (type && !partner) {
      return res.status(401).json({ partner: 'يرجى ادخال اسم صاحب الدين ' });
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
      type,
      total,
      expenses,
      partner
    });
    const data = await Travel.findById(newTravel._id)
      .populate('driver', 'name')
      .populate('partner', 'name')
      .lean()
      .exec();

    res.status(200).json({ data });
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
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).end();
  }
};

export const putTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log(body);
    const data = await Travel.findByIdAndUpdate(id, body, { new: true })
      .populate('driver', 'name')
      .populate('partner', 'name')
      .lean()
      .exec();
    res.status(200).json({ data });
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllTravelForDriverBetweenTwoDates = async (req, res) => {
  try {
  } catch (e) {
    res.status(400).end();
  }
};

export const getAllTravelForCarBetweenTwoDates = async (req, res) => {
  try {
  } catch (e) {
    res.status(400).end();
  }
};
