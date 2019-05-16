const app = angular.module('ShopApp', []);

app.controller('ShopController', ['$http', function($http){
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
    }, function(){
      console.log('error');
    });
  };
  
}])
