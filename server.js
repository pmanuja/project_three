// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// middlewear
app.use(express.json());
app.use(express.static('public'));

// connect controller
const userController = require('./controllers/user.js');
app.use('/users', userController);

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/project_three', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('i am a mongoose');
});

// port listening...
app.listen(3000, () => {
  console.log('listening...');
});
