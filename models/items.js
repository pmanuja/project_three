const mongoose = require(`mongoose`);

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, default: 0},
  category: String,
  description: String,
  image: String,
  reviews: [{
    username: String,
    ratings: {type:Number, min:0, max:5},
    review:String
  }]

});

const Items = mongoose.model('Item', itemSchema);

module.exports = Items;
