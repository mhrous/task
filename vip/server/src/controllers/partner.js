import { Partner } from '../model';
export const getALLPartner = async (req, res) => {
  try {
    const data = await Partner.find({
      active: true
    })
      .lean()
      .exec();

    res.status(200).json({ data });
  } catch (e) {
    res.status(400).end();
  }
};

export const getALLPartnerName = async (req, res) => {
  try {
    const data = await Partner.find({
      active: true
    })
      .select('name')
      .lean()
      .exec();

    res.status(200).json({ data });
  } catch (e) {
    res.status(400).end();
  }
};

export const addNewPartner = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ name: 'يجب ادخال اسم الشريك' });
  }

  try {
    const partner = await Partner.findOne({ name })
      .lean()
      .exec();

    if (partner) {
      return res.status(401).json({
        name:
          ' الشريك موجود مسبقا اذا رغبت بتعديل معلوماته يمكنك تعديلها من صفحته'
      });
    }
    const data = await Partner.create(req.body);

    return res.status(200).send({ data });
  } catch (e) {
    res.status(500).end();
  }
};
