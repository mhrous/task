import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
    required: true
  },
  partnerTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partner'
  },
  partnerBack: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partner'
  },
  date: {
    type: Date,
    required: true
  },
  from: {
    type: String
  },
  to: {
    type: String
  },
  clientName: {
    type: String
  },
  clientPhone: {
    type: String
  },
  notes: {
    type: [{
      type: String
    }],
    default: []
  },

  totalTo: {
    type: Number,
    required: true,
    default: 0
  },
  totalBack: {
    type: Number,
    required: true,
    default: 0,
  },

  expenses: {
    type: Map,
    of: Number
  }

}, {
  timestamps: true
});

export const Travel = mongoose.model('travel', travelSchema);