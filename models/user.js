const mongoose = require('mongoose');
const Item = require('./items.js');


const userSchema = new mongoose.Schema ({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  shoppingCart: [Item.schema],
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
