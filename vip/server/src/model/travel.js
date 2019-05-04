import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema(
  {
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
    partner: {
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
      type: [{ type: String }],
      default: []
    },
    type: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Travel = mongoose.model('travel', travelSchema);
