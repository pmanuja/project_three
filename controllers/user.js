const express = require('express');
const users = express.Router();
const Users = require('../models/user.js');
const bcrpyt = require('brypt');

users.get('/', (req, res) => {
  Users.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  });
});

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrpyt.genSaltSync(10));
  Users.create(req.body, (req, createdUser) => {
    res.status(201).json({
      status:201,
      message: "user created"
    });
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
