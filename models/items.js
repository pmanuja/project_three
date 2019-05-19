const mongoose = require(`mongoose`);


const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, default: 0},
  category: String,
  description: String,
  image: String,
  //Reviews - Implement when ready
});

const Items = mongoose.model('Item', itemSchema);

module.exports = Items;
