// models/Period.js
const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  lastPeriodDate: { type: Date, required: true },
  cycleLength: { type: Number, required: true },
});

const Period = mongoose.model('Period', periodSchema);

module.exports = Period;
