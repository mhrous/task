import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
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
  notes: {
    type: [{ type: String }],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  }
});

export const Partner = mongoose.model('partner', partnerSchema);
