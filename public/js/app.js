const app = angular.module('ShopApp', []);

app.controller('ShopController', ['$http', function($http){
  const controller = this;
  this.indexOfEditFormToShow = null;
  this.createNewItem = {};
  this.updateItemAttrs = {};
  this.showModal = false;
  this.itemIndex = null;
  this.displayReviewForm = 0;

  this.showProductDetails = function($index){
    console.log("view product details" + $index);
    controller.showModal = true;
    controller.itemIndex = $index;
  };


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
  };

  this.getUsername = function(){
    $http({
      method:'GET',
      url: '/app'
    }).then(function(response){
      console.log(response);
      controller.loggedInUsername = response.data.username;
    }, function(){
      console.log('error');
    })
  }

  this.addReview = function(item_id) {
    console.log(`line 46`);
    console.log(this.reviewInfo);
    $http({
      method:'PUT',
      url: '/items/addReview/' + item_id,
      data: this.reviewInfo
    }).then(function(response){
      console.log(response);
      controller.getItems();
      controller.displayReviewForm = 0;
      controller.reviewInfo = {};
    }, function(error) {
      console.log(error);
    });
  };

  this.updateItem = function(item_id) {
    console.log("hello update me" + item_id);
    $http({
      method: 'PUT',
      url: '/items/' + item_id,
      data: this.updateItemAttrs.temporaryItem
    }).then(function(response){
      console.log(response);
      controller.getItems(); // check with team to refactor it
      controller.updateItemAttrs = {};
      controller.indexOfEditFormToShow = null;
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
      controller.createNewItem = {};
    }, function(error) {
      console.log(error);
    });
  }


  this.getItems = function(){
    $http({
      method: 'GET',
      url: '/items'
    }).then(function(response){
      //console.log(response.data);
      controller.items = response.data;
    }, function(error) {
      console.log(error);
    });
  }

  controller.getItems();

}])





app.controller('UserController', ['$http', function($http){
  const controller = this;

  this.pageToDisplay = 0;

  this.getSubTotal = function(){
    cartItems = controller.userShoppingCart; //testing!
    if(cartItems != null){
      var total = 0;
      for(let i = 0; i < cartItems.length; i++){
          let cartItem = cartItems[i];
          total += (cartItem.item.price * cartItem.quantity);
      }
      //'toFixed' gives 2 decimal places
        total = total.toFixed(2);
    }

    return total;
  }

  this.openShop = function(){
    $http({
      method:'GET',
      url: '/app'
    }).then(function(response){
      controller.loggedInUsername = response.data.username;
      controller.loggedInUserID = response.data._id;
      controller.userIsAdmin = response.data.isAdmin;
      if(controller.loggedInUsername){ //Update the shopping cart
        controller.getShoppingCart(controller.loggedInUserID);
      }
    }, function(){
      console.log('error');
      if(controller.loggedInUsername === undefined){
        console.log(`No session exists - username not found. (This may be OK!)`);
      };
    });
  };

  this.createUser = function(){

    $http({
      method:'POST',
      url: '/users',
      data: {
        username: this.createUsername,
        password: this.createPassword,
        email: this.createEmail,
      }
    }).then(function(response){
      console.log(response);
      controller.createUsername = null;
      controller.createPassword = null;
      controller.createEmail = null;
    }, function(error){
      console.log('error');
    });
  };

  this.logIn = function(){
    $http({
      method:'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response){
      controller.username = null;
      controller.password = null;
      controller.openShop();
    }, function(){
      console.log('error');
    });
  };

  this.logOut = function(){
    $http({
      method:'DELETE',
      url:'/sessions'
    }).then(function(response){
      console.log(response);
      //Clear all user-specific data!
      controller.loggedInUsername = null;
      controller.loggedInUserID = null;
      controller.userShoppingCart = [];
      controller.userIsAdmin = false;
    }, function(){
      console.log('error');
    });
  };

  //Gets the user's shopping cart
  this.getShoppingCart = function(userID, displayCartBool = false) {
    $http({
      method:`GET`,
      url:`/users/getCartContents/${userID}`
    }).then(function(response){
      controller.userShoppingCart = response.data;
      if(displayCartBool === true) {
        controller.pageToDisplay = 3;
      }
    }, function() {
      console.log('error');
    });
  };

  this.addToCart = function(amountToAdd, itemID, updateSubtotalBool = false){
    $http({
      method: `PUT`,
      url:`/users/addToCart/${controller.loggedInUserID}`,
      data: {
        itemID: itemID,
        quantity: amountToAdd,
      },
    }).then(function(response){
      controller.getShoppingCart(controller.loggedInUserID);
      if(updateSubtotalBool === true) {
        controller.getSubTotal();
      }
    }, function(){
      console.log(`Error in .addToCart in UserController`);
    });
  };

  controller.openShop();
}]);
