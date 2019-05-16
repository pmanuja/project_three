// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// connect controllers
const userController = require('./controllers/user.js');
app.use('/users', userController);
const itemController = require(`./controllers/item_controller.js`);
app.use(`/items`, itemController);

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/project_three', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('i am a mongoose');
});

// port listening...
app.listen(3000, () => {
  console.log('listening...');
});


//Routes
