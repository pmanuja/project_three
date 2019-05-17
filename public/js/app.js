const app = angular.module('ShopApp', []);

app.controller('ShopController', ['$http', function($http){
  const controller = this;
  this.indexOfEditFormToShow = null;
  this.createNewItem = {};
  this.updateItemAttrs = {};

  this.deleteItem = function(item_id) {
      console.log('delete me ' + item_id);
      $http({
          method:'DELETE',
          url: '/items/' + item_id
      }).then(function(response){
        console.log(response.data);
        const removeByIndex = controller.items.findIndex(item => item._id === item_id);
        controller.items.splice(removeByIndex, 1);
      }, function(error) {
        console.log(error);
      });
  }


  this.updateItem = function(item_id) {
    console.log("hello update me" + item_id);
    $http({
      method: 'PUT',
      url: '/items/' + item_id,
      data: this.updateItemAttrs
    }).then(function(response){
      console.log(response);
      controller.getItems(); // check with team to refactor it
      controller.updateItemAttrs = {};
      this.indexOfEditFormToShow = null;
    }, function(error) {
      console.log(error);
    });
  }



  this.createItem = function() {
    console.log(this.createNewItem);
    $http({
      method: 'POST',
      url: '/items',
      data: this.createNewItem
    }).then(function(response){
      console.log(response);
      controller.items.unshift(response.data);
      this.createNew = {};
    }, function(error) {
      console.log(error);
    });
  }


  this.getItems = function(){
    $http({
      method: 'GET',
      url: '/items'
    }).then(function(response){
      console.log(response.data);
      controller.items = response.data;

    }, function(error) {
      console.log(error);
    });
  }

  controller.getItems();

}])

app.controller('UserController', ['$http', function($http){
  const controller = this;

  this.createUser = function(){
    $http({
      method:'POST',
      url: 'users',
      data: {
        username: this.createUsername,
        password: this.createPassword,
        email: this.createEmail
      }
    }).then(function(response){
      console.log(response);
    }, function(error){
      console.log('error');
    });
  };

}])
