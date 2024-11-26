// routes/Dashboard.js
const express = require("express");
const router = express.Router();
const Dashboard = require("../models/Dashboard"); // Import model for storing data in MongoDB

router.post("/submit", async (req, res) => {
  const { cycleLength, mood, weight, water, expertTips } = req.body;

  try {
    const newEntry = new Dashboard({
      cycleLength,
      mood,
      weight,
      water,
      expertTips
    });

    await newEntry.save();
    res.status(200).json({ message: "Data submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting data", error: error.message });
  }
});

module.exports = router;
