const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/Dashboard");
const appointmentRoutes = require("./routes/AppointmentRoute");
const periodRoute = require("./routes/PeriodRoute");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', appointmentRoutes);  // Correct the route for appointments
app.use('/api', periodRoute);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
