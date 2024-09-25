const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

// Import routes
const authRoutes = require('./routes/auth');
const middle = require('./middleware/auth');
const locationRoutes = require('./routes/Location');
const vehicleRoutes = require('./routes/Vehicle');
const packageRoutes = require('./routes/package');
const checklistRoutes = require('./routes/checklist');
const locationAdmin = require('./routes/Locationadmin');
const auth1 = require('./routes/auth1');
const addRoute = require("./routes/create");

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(express.json()); // This replaces bodyParser.json()

// Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB database connection established successfully");
    })
    .catch((error) => {
        console.error("Connection error:", error);
    });

// Route Definitions
app.use('/api/auth', auth1);
app.use('/api/checklists', checklistRoutes);
app.use('/TourGuide', addRoute);
app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
// app.use('/vehicle', vehicleRoutes); // Uncomment if needed
app.use('/uploads', express.static('uploads'));
app.use('/packages', packageRoutes);
app.use('/locationAdmin', locationAdmin);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
