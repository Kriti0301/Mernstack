const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // prevent duplicate registrations
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/, // 10 to 15 digits
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
