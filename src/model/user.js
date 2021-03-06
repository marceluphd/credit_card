const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

mongoose.model('User', UserSchema);
