const express = require('express');
const Period = require('../models/Period');

// Function to calculate the next period date
function calculateNextPeriod(lastPeriodDate, cycleLength) {
  const lastDate = new Date(lastPeriodDate); // Ensure it's a Date object
  const nextPeriodDate = new Date(lastDate);
  nextPeriodDate.setDate(lastDate.getDate() + cycleLength);  // Add cycle length days to last period date
  return nextPeriodDate.toISOString(); // Return as ISO string
}

const router = express.Router();

// Route to save period data
router.post('/save-period', async (req, res) => {
  const { userId, lastPeriodDate, cycleLength } = req.body;
  try {
    const period = new Period({
      userId,
      lastPeriodDate: new Date(lastPeriodDate),  
      cycleLength,
    });
    await period.save();
    res.status(200).json({ message: 'Period data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save period data' });
  }
});


router.post('/predict-next-period', async (req, res) => {
  const { userId } = req.body;
  try {
    const periodData = await Period.findOne({ userId });
    if (!periodData) {
      return res.status(404).json({ error: 'No period data found for this user' });
    }

    const { lastPeriodDate, cycleLength } = periodData;
    const nextPeriodDate = calculateNextPeriod(lastPeriodDate, cycleLength);
    res.status(200).json({ nextPeriodDate });
  } catch (error) {
    res.status(500).json({ error: 'Failed to predict next period' });
  }
});

module.exports = router;
