const mongoose = require('mongoose');
const Item = require('./items.js');


const userSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  shoppingCart: [{
    itemID: String,
    quantity: Number,
  }],
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
