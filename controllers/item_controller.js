const express = require(`express`);
const router = express.Router();

const Items = require(`../models/items.js`);
const seedProducts = require(`../models/seedProducts.js`);

//GET - full list of items from database
router.get(`/`, function(req,res){
  Items.find({}, function(error, allItems){
    if(error){
      console.log(`Error in GET: Item`);
    } else {
      res.json(allItems);
    }
  });
});

//POST - a new item to the database
router.post(`/`, function(req,res){
  Items.create(req.body, function(error, newItem){
    if(error){
      console.log(`Error in POST: Item`);
    } else {
      res.json(newItem);
    }
  });
});

//DELETE - an item from the database
router.delete(`/:id`, function(req,res){
  Items.findByIdAndRemove(req.params.id, function(error, deletedItem){
    if(error){
      console.log(`Error in DELETE: Item`);
    } else {
      res.json(deletedItem);
    }
  });
});

//PUT - edit an item in the database
router.put(`/:id`, function(req,res){
  Items.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(error, editedItem){
    if(error){
      console.log(`Error in PUT: Item`);
    } else {
      res.json(editedItem);
    }
  });
});

// if you don't want to add your own data, use this seed route @ http://localhost:3000/products/seed/newmuffins
router.get('/seed/newproducts', (req, res) => {
  console.log("i m in seed");
  Items.create(seedProducts, (error, createdProducts) => {
    if(error){
      console.log(`Error in SEED: Item`);
    } else {
      res.json(createdProducts);
    }
  });
})
module.exports = router;
