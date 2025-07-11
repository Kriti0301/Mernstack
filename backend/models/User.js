const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10,15}$/,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer", 
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
