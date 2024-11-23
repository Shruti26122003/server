const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  symptom: { type: String },           // Added symptom field
  cycle: { type: Date },               // Added cycle field (Date type for menstrual cycle)
  appointmentDate: { type: Date, required: true },  // Changed to match frontend data
  message: { type: String },           // Added message field
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
