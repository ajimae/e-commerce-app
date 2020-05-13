import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false,
    unique: true
  },
  password: String,
  role: {
    type: String,
    required: true,
    default: 'regular'
  }
});

const User = mongoose.model('User', userSchema);

export default User;
