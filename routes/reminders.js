const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const requiresAuth = require('../middleware/permissions');

// @route   POST /api/reminders/new
// @desc    Create a new reminder
// @access  Private
router.post('/new', async (req, res) => {
  try {
    const newReminder = new Reminder({
      user: req.user._id,
      content: req.body.content,
    });

    await newReminder.save();
    return res.json(newReminder);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route   GET /api/reminders/current
// @desc    Get user's reminders
// @access  Private
router.get('/current', requiresAuth, async (req, res) => {
  try {
    const allReminders = await Reminder.find({ user: req.user._id });
    return res.json({ allReminders });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
