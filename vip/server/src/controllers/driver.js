import {
  Driver,
  Status
} from '../model';

export const getALLDriver = async (req, res) => {
  try {
    const data = await Driver.find({
        active: true
      })
      .lean()
      .exec();

    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const getALLDriverName = async (req, res) => {
  try {
    const data = await Driver.find({
        active: true
      })
      .select('name')
      .lean()
      .exec();

    res.status(200).json({
      data
    });
  } catch (e) {
    res.status(400).end();
  }
};

export const addNewDriver = async (req, res) => {
  const {
    name,
    car
  } = req.body;
  if (!name) {
    return res.status(401).send({
      name: 'يجب ادخال اسم السائق'
    });
  }
  if (!car) {
    return res
      .status(401)
      .send({
        car: 'يجب ادخال اسم السيارة التي يعنل عليها'
      });
  }

  try {
    let driver = await Driver.findOne({
        name
      })
      .lean()
      .exec();

    if (driver) {
      return res.status(401).json({
        name: ' السائق موجود مسبقا اذا رغبت بتعديل معلوماته يمكنك تعديلها من صفحته'
      });
    }

    driver = await Driver.findOne({
        car
      })
      .lean()
      .exec();

    if (driver) {
      return res.status(401).json({
        car: `هذه السيارة تابعة ${driver.name} `
      });
    }
    const data = await Driver.create(req.body);
    await Status.create({
      driver: data._id
    });

    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

export const getDriverWithCar = async (req, res) => {
  try {
    const data = await Driver.find({})
      .populate('car', 'name number')
      .select('name')
      .lean()
      .exec();
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();
  }
};

export const getDriver = async (req, res) => {
  try {
    const {
      id
    } = req.params

    const data = await Driver.findById(id)
      .populate('car', 'name number')
      .lean()
      .exec();
    return res.status(200).send({
      data
    });
  } catch (e) {
    res.status(500).end();


  }
}