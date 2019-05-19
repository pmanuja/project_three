const express = require('express');
const users = express.Router();
const Users = require('../models/user.js');
const Items = require(`../models/items.js`);
const bcrypt = require('bcrypt');

//GET - full list of users
users.get('/', (req, res) => {
  Users.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

//POST - a new user
users.post('/', (req, res) => {
  req.body.shoppingCart = [];
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  Users.create(req.body, (req, createdUser) => {
    res.status(201).json({
      status:201,
      message: "user created"
    });
  });
});

//PUT - add a single existing item from the item database to a user's shoppingCart array.
//req.params.id should be the user's id
//req.body needs to contain the items id - make sure this is added to it when going to this route!
//Extend this method to allow for counting how many the user wants (right now, the item is just pushed onto the array)
users.put(`/addToCart/:id`, function(req,res) {
  Items.find({_id:req.body.itemID}, function(error, foundItem){
    Users.find({_id:req.params.id}, function(error, foundUser){
      console.log(foundUser[0]);
      console.log(foundItem[0]);
      console.log(foundUser[0].shoppingCart);
      foundUser[0].shoppingCart.push(foundItem[0]);
      foundUser[0].save( function(error,data){
        res.json(foundUser[0]);
      });
    });
  });
});

//DELETE - a single user
users.delete('/:id', (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.json(deletedUser);
  });
});

//PUT - edit a single user
users.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
    res.json(updatedUser);
  });
});




module.exports = users;
