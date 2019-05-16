const express = require('express');
const users = express.Router();
const Users = require('../models/user.js');

users.get('/', (req, res) => {
  Users.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

users.post('/', (req, res) => {
  Users.create(req.body, (req, createdUser) => {
    res.json(createdUser);
  });
});

users.delete('/:id', (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    res.json(deletedUser);
  });
});

users.put('/:id', (req, res) => {
  Users.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedUser) => {
    res.json(updatedUser);
  });
});

module.exports = users;
