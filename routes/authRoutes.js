const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();


router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Request Body:", req.body); // Log incoming data for debugging

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error("Error: Email already in use");
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user to database
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    console.log("User registered successfully:", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration failed:", err.message); // Log server error
    res.status(500).json({ error: "Registration failed" });
  }
});


// Login route
router.post("/login", async (req, res) => {
  console.log("Login route hit");
  const { email, password } = req.body;
  console.log("Email:", email, "Password:", password);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});


module.exports = router;
