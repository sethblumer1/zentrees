const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');

// @route   POST /api/reminders/new
// @desc    Create a new reminder
// @access  Private
router.post('/new', async (req, res) => {
  try {
    const newReminder = new Reminder({
      content: req.body.content,
    });

    await newReminder.save();
    return res.json(newReminder);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
