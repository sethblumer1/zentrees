const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

// export the model
const User = model('User', UserSchema);
module.exports = User;
