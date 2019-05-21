// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

const db = mongoose.connection;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//Change the secret to an environmental variable, eventually
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

// connect controllers
const userController = require('./controllers/user.js');
const itemController = require(`./controllers/item_controller.js`);
const sessionController = require('./controllers/session_controller.js');

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

// port listening...
app.listen(process.env.PORT, () => {
  console.log('listening...');
});

//Controller routes
app.use('/users', userController);
app.use(`/items`, itemController);
app.use(`/sessions`, sessionController);

//All other routes
app.get('*', (req, res) => {
  res.status(404).json('Sorry, page not found.')
});

//A route to access additional user functionality on the app once signed in. Returns the session's current user.
app.get('/app', (req, res)=>{
  if(req.session.currentUser){
    res.json(req.session.currentUser);
  } else {
    res.status(401).json({
      status:401,
      message:'not logged in'
    });
  }
});

// CODE GRAVEYARD
// // connect to mongoose
// mongoose.connect(, { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('i am a mongoose');
// });
