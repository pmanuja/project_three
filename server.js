// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// middlewear
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/project_three', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('i am a mongoose');
});

// port listening...
app.listen(3000, () => {
  console.log('listening...');
});

//Routers
const itemController = require(`./controllers/item_controller.js`);

//Routes
app.use(`/items`, itemController);
