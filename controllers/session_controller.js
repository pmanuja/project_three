const express = require(`express`);
const router = express.Router();
const bcrypt = require('bcrypt');

const Users = require('../models/user.js');

//All routes: /sessions/...

//POST - a new session. Takes a username and password, then compares them to the list of registered Users. If a match is found, a session is created, and the session.currentUser is set to the matched user.
router.post(`/`, function(req,res){
  if(req.body.username && req.body.password){
    Users.findOne({username:req.body.username}, function(error, foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.currentUser = foundUser;
        res.status(201).json({
          status:201,
          message:'session created'
        });
      } else {
        res.status(401).json({
          status:401,
          message:'login failed'
        });
      }
    });
  }
});

//DELETE - the current session. Destroys the session.
router.delete(`/`, function(req,res){
  req.session.destroy(()=>{
    res.status(200).json({
      status:200,
      message:'logout complete'
    });
  });
});

module.exports = router;
