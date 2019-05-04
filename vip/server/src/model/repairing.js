import mongoose from 'mongoose';

const repairingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

export const Repairing = mongoose.model('repairing', repairingSchema);
