const { Schema, model } = require('mongoose');

const ReminderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    timeAt: {
      type: Date,
      required: false,
    },
    complete: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamp: true }
);

// Export the model
const Reminder = model('Reminder', ReminderSchema);
module.exports = Reminder;
