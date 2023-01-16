// For .env variables
require('dotenv').config();

// Start Express application
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// For backend data
const mongoose = require('mongoose');

// For token
const cookieParser = require('cookie-parser');

// Import routes
const reminderRoute = require('./routes/reminders');
const authRoute = require('./routes/auth');

// Setting the port
let port = process.env.PORT;

// Twilio variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Initialize routes to use
app.use('/api/reminders', reminderRoute);
app.use('/api/auth', authRoute);

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

// Schema and model
const UserSchema = new mongoose.Schema({
  users: Number,
});

const OTP = mongoose.model('OTP', UserSchema);

app.post('/verify', function (req, res) {
  // Grabs users input
  const code = req.body.code;

  // Matching database number with users input
  OTP.findOne({ users: code }, function (err, found) {
    if (err) {
      console.log(err);
      return res.json({ message: err });
    } else if (found) {
      // This should return something
      console.log('success');
      OTP.findOneAndDelete(code, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('deleted');
        }
      });
      return res.json({ message: 'success' });
    } else {
      // Needs to return code invalid ?
      console.log(err);
      return res.json({ message: err });
    }
  });
});

// Post request using user's phone number with Twilio
app.post('/send-code', function (req, res) {
  const userNumber = req.body.number;

  // generates random 4 digit number between 1-9
  let randomNum = Math.floor(Math.random() * 900000) + 100000;

  // Sends random number to users number (Twilio)
  client.messages
    .create({
      body: randomNum,
      from: `${process.env.TWILIO_PHONE_NUM}`,
      to: userNumber,
    })
    .then(saveUser())
    .then(function (message) {
      // console.log(message);
      return res.json(message);
    })
    .catch(function (err) {
      console.log(err);
    });

  // Saves random number to database then renders verify page
  function saveUser() {
    const newUser = new OTP({
      users: randomNum,
    });
    newUser.save(function (err) {
      if (err) {
        console.log('error generating num');
      } else {
        console.log('code saved successfully');
      }
    });
  }
});
