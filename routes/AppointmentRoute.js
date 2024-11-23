const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      symptom: req.body.symptom,
      cycle: req.body.cycle,
      appointmentDate: req.body.appointmentDate,
      message: req.body.message,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
