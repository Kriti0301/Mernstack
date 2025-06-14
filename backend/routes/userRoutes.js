const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/users/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create and save new user
    const user = new User({ fullName, email, phone, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
