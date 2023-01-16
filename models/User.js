const { Schema, model } = require('mongoose');

const AccountSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

// export the model
const Account = model('Account', AccountSchema);
module.exports = Account;
