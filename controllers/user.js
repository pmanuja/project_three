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


//PUT - adds a reference to an existing item to a user's shopping cart array. If the item is there already, it adds to the quantity instead. The reference uses the item's database id.
//req.params.id should be the user's id!
//req.body needs to contain 'itemID' and 'quantity' - make sure these are added to req.body when going to this route!
//Negative quantities reduce the amount in the cart - if brought to 0 (or lower), the item is removed from the cart.
users.put(`/addToCart/:id`, function(req,res) {
  Users.findById(req.params.id, function(error, foundUser){
    //Checks if the item reference is already in the cart. Gives the index if so, otherwise itemIndex = -1.
    let itemIndex = foundUser.shoppingCart.findIndex(function(element){
      if(element.itemID === req.body.itemID) {
        console.log("found!");
        return true;
      } else {
        return false;
      }
    });
    console.log(itemIndex);
    let shoppingCartItem = {
      itemID: req.body.itemID,
      quantity: parseInt(req.body.quantity),
    };

    if(itemIndex === -1) { //Create a new item reference in the cart
      foundUser.shoppingCart.push(shoppingCartItem);
    } else { //Add or remove item quantity
      foundUser.shoppingCart[itemIndex].quantity += shoppingCartItem.quantity;

      if(foundUser.shoppingCart[itemIndex].quantity <= 0) { //Remove the item
        foundUser.shoppingCart.splice(itemIndex,1);
      }
    }

    foundUser.save( function(error,data){ //Saves the changes in the database
      res.json(foundUser);
    });

  });
});

//GET - the full list of items from the user's cart.
users.get(`/getCartContents/:id`, function(req,res){
  Users.findById(req.params.id, function(error, foundUser){
    let userCart = foundUser.shoppingCart;
    let outputCart = [];
    for(let i = 0; i < userCart.length; i++) {
      console.log(`Item ${i}`);
      Items.findById(userCart[i].itemID, function(error, foundItem){
        console.log(foundItem);
        let outputItem = {
          item: foundItem,
          quantity: userCart[i].quantity,
        };
        console.log(outputItem);
        outputCart.push(outputItem);
        if(i === userCart.length-1) {
          console.log(outputCart);
          res.json(outputCart);
        }
      });
    }; //End loop

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
