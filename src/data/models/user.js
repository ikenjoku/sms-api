const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
    trim: true,
  },
  // email: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },
});

const User = mongoose.model('User', UserSchema);

export default User;
