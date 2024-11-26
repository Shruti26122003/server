const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  symptom: { type: String },           
  cycle: { type: Date },               
  appointmentDate: { type: Date, required: true },  
  message: { type: String },          
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
