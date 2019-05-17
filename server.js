// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const db = mongoose.connection;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// connect controllers
const userController = require('./controllers/user.js');
const itemController = require(`./controllers/item_controller.js`);

// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{console.log('i am a mongoose');
});

// // connect to mongoose
// mongoose.connect(, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('i am a mongoose');
// });

// port listening...
app.listen(3000, () => {
  console.log('listening...');
});


//Controller routes
app.use('/users', userController);
app.use(`/items`, itemController);

//All other routes
