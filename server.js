// dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//Change the secret to an environmental variable, eventually
app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));

// connect controllers
const userController = require('./controllers/user.js');
const itemController = require(`./controllers/item_controller.js`);
const sessionController = require('./controllers/session_controller.js');

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/project_three', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('i am a mongoose');
});

// port listening...
app.listen(3000, () => {
  console.log('listening...');
});


//Controller routes
app.use('/users', userController);
app.use(`/items`, itemController);
app.use(`/sessions`, sessionController);

//All other routes

//A route to access additional user functionality on the app once signed in. Returns the session's current user.
app.get(`/app`, function(req,res){
  res.json(req.session.currentUser);
});
