import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
    minlength: 4
  },

  password: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 4
  }
});

export const User = mongoose.model('user', userSchema);
