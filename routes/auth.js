const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const requiresAuth = require('../middleware/permissions');

// @route POST /api/auth
// @desc Create / log in user
// @access Public
router.post('/login', async (req, res) => {
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

      const payload = { userId: usertoReturn._id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('access-token', token, {
        // Expires in 7 days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      const usertoReturn = { ...savedUser._doc };

      // Return the new user
      return res.json({ user: usertoReturn });
    } else {
      const payload = { userId: isUser._id };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('access-token', token, {
        // Expires in 7 days
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });

      const usertoReturn = { ...isUser._doc };

      // Return the new user
      return res.json({ user: usertoReturn });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

// @route GET /api/auth/current
// @desc Return currently authed user
// @access Private
router.get('/current', requiresAuth, (req, res) => {
  // console.log(req);
  if (!req.user) {
    return res.status(401).send('Unauthorized');
  }

  // If user is properly authed, we should return that
  return res.json(req.user);
});

// @route   PUT /api/auth/logout
// @desc    Logout user and clear the cookie
// @access  Private
router.put('/logout', (req, res) => {
  try {
    res.clearCookie('access-token');

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
