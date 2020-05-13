import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

/**
 * @description encrypt and store user password
 *
 * @param save, callback
 */
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  // generate a hashing salt
  bcrypt.genSalt(10, function(error, salt) {
    if (error) {
      throw new Error('error occurred while encryting password');
    }

    // hash password using generated salt
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) {
        throw new Error('an error occurred while encryting password');
      }
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema);

export default User;
