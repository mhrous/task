import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  partner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partner'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver'
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['مدفوع', 'مقبوض'],
    default: 'مقبوض'
  }
});

export const Payment = mongoose.model('payment', paymentSchema);
