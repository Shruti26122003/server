const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  cycleLength: { type: Number, required: true },
  mood: { type: String, required: true },
  weight: { type: Number, required: true },
  water: { type: Number, required: true },
  expertTips: { type: String, required: true },
}, { timestamps: true });

const Dashboard = mongoose.model("Dashboard", dashboardSchema);
module.exports = Dashboard;
