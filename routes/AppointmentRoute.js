const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

router.post("/appointments", async (req, res) => {   //post-add appointment
  console.log("Incoming Request:", req.body);
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    console.log("Appointment Saved:", appointment);
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error("Error in POST /appointments:", error.message);
    res.status(400).json({ error: error.message });
  }
});

router.get("/appointments", async (req, res) => {   //get-retrieval
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error in GET /appointments:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
