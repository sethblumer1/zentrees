// For .env variables
require('dotenv').config();

// Start Express application
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());
const path = require('path');

// For backend data
const mongoose = require('mongoose');

// Import routes
const reminderRoute = require('./routes/reminders');

// Setting the port
let port = process.env.PORT;

// Initialize routes to use
app.use('/api/reminders', reminderRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
