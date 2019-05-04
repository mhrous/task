import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
    unique: true
  },
  place: {
    type: String,
    enum: ['دمشق', 'بيروت', ' '],
    default: ' '
  },
  go: {
    type: Boolean,
    default: false
  },
  back: {
    type: Boolean,
    default: false
  }
});

export const Status = mongoose.model('statu', StatusSchema);
