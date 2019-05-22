import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  expensesMax: {
    type: Number,
    require: true
  },

  notes: {
    type: [{ type: String }],
    default: []
  },
  active: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: ' '
  }
});

export const Car = mongoose.model('car', carSchema);
