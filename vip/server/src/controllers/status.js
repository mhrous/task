import { Status, Driver, Setting } from '../model';
import { getStartDate } from '../utils';
export const getStatus = async (req, res) => {
  try {
    const lastUpdate = await Setting.findOne({ name: 'lastUpdateStatus' })
      .lean()
      .exec();
    const start = getStartDate();

    if (!lastUpdate || start.getTime() > lastUpdate.value.getTime()) {
      if (!lastUpdate) {
        await Setting.create({
          name: 'lastUpdateStatus',
          value: Date.now()
        });
      } else {
        await Setting.findOneAndUpdate(
          { name: 'lastUpdateStatus' },
          { value: Date.now() }
        );
      }
      const drivers = await Driver.find({
        active: true
      })
        .select('_id')
        .lean()
        .exec();

      const driverId = drivers.map(e => e._id.toString());

      await Status.find({})
        .deleteMany()
        .lean()
        .exec();

      const createObject = driverId.map(e => ({ driver: e }));
      await Status.create(createObject);
      const data = await Status.find({})
        .populate('driver', 'name phone')

        .lean()
        .exec();
      res.status(200).json({
        data
      });
    } else {
      const data = await Status.find({})
        .populate('driver', 'name phone')
        .lean()
        .exec();
      res.status(200).json({
        data
      });
    }
  } catch (e) {
    res.status(500).end();
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Status.findByIdAndUpdate(id, req.body, {
      new: true
    })
      .lean()
      .exec();

    res.status(200).json({ data });
  } catch (e) {
    res.status(400).end();
  }
};
