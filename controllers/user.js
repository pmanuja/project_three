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

    if(foundUser){ //Avoids crashes if the user is not logged in
      let itemIndex = foundUser.shoppingCart.findIndex(function(element){
        if(element.itemID === req.body.itemID) {
          return true;
        } else {
          return false;
        }
      });

      let shoppingCartItem = {
        itemID: req.body.itemID,
        quantity: parseInt(req.body.quantity),
      };

      if(itemIndex === -1) { //Create a new item reference in the cart
        foundUser.shoppingCart.push(shoppingCartItem);
      } else { //Add or remove item quantity
        if(req.body.removeFromCart === true) { //Get rid of the item
          foundUser.shoppingCart[itemIndex].quantity -= foundUser.shoppingCart[itemIndex].quantity;
        } else { //Change item count normally
          foundUser.shoppingCart[itemIndex].quantity += shoppingCartItem.quantity;
        }

        if(foundUser.shoppingCart[itemIndex].quantity <= 0) { //Remove the item
          foundUser.shoppingCart.splice(itemIndex,1);
        }
      }

      foundUser.save( function(error,data){ //Saves the changes in the database
        res.json(foundUser);
      });
    }


  });
});



//GET - the full list of items from the user's cart.
//If items have been deleted from the database, it will remove them from the shopping cart automatically
users.get(`/getCartContents/:id`, function(req,res){
  Users.findById(req.params.id, function(error, foundUser){
    let userCart = foundUser.shoppingCart;
    let outputCart = [];
    let removedItemIndicies = [];
    for(let i = 0; i < userCart.length; i++) {
      Items.findById(userCart[i].itemID, function(error, foundItem){
        if(foundItem === null) { //No item was found
          removedItemIndicies.push(i);
        }
        let outputItem = {
          item: foundItem,
          quantity: userCart[i].quantity,
        };
        outputCart.push(outputItem);

        if(outputCart.length === userCart.length) {
          //sort item indicies, largest to smallest
          removedItemIndicies.sort(function(a, b){return b - a});
          //Remove the deleted items from the shopping cart
          for(let j = 0; j < removedItemIndicies.length; j++) {
            foundUser.shoppingCart.splice(removedItemIndicies[j],1);
          }
          console.log(foundUser.shoppingCart);
          foundUser.save( function(error,data){
            res.json(outputCart);
          });
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
