import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    unique: true
  },
  phone: {
    type: Map,
    of: String
  },
  address: {
    type: String
  },
  rest: {
    type: Number,
    default: 0
  },
  last: { type: Date, default: Date.now },

  notes: {
    type: [{ type: String }],
    default: []
  },

  active: {
    type: Boolean,
    default: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    unique: true
  }
});

export const Driver = mongoose.model('driver', driverSchema);
