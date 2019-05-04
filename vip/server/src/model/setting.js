import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  value: {
    type: Date,
    required: true
  }
});

export const Setting = mongoose.model('setting', settingSchema);
