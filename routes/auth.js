const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @route POST /api/auth
// @desc Create / log in user
// @access Public
router.post('/', async (req, res) => {
  try {
    const isUser = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    // Check if user's phone number is in database
    if (!isUser) {
      // Create a new user
      const newUser = new User({
        phoneNumber: req.body.phoneNumber,
      });

      // Save user to database
      const savedUser = await newUser.save();

      // Return the new user
      return res.json(savedUser);
    } else {
      return res.json({ message: 'has account' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
