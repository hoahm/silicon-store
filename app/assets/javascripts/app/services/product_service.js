"use strict";

var ProductService = function($rootScope, $http, $location, $state, $stateParams, $filter, $timeout, $interval, $controller, Product){

  var scope = {};

  this.initializeScope = function(scopeObject){
    scope = scopeObject;
    scope.products = {};
    scope.page = 1;
    scope.totalPages = 1;
  };

  this.getProducts = function(){
    $http.get(Routes.products_path({format: 'json'}),
      {
        page: scope.page
      }
    )
    .success(function(response){
      scope.products = response.products;
      scope.page = response.page;
      scope.totalPages = response.total_pages;
      scope.featureProduct = scope.products[0];
    })
    .error(function(response, status){
      // Handler error
    });
  };

  this.loadSliser = function(){
    $timeout(function(){
      $('.slider').bxSlider({
        pager: false
      });
    });
  };

  this.loadFeatureProduct = function(){
    $interval(function(){
      var randomIndex = Math.floor(Math.random() * scope.products.length);
      scope.featureProduct = scope.products[randomIndex];
    }, 3000);
  };

  this.syncRealTime = function(){
    var socket = io.connect('http://silicon-store-server.herokuapp.com:3001/');

    socket.on('message', function (response) {
      var data = JSON.parse(response);

      if (data.state == "created"){
        scope.products.push(data);
        console.log("created");
      } else if (data.state == "update") {
        scope.products.forEach(function(product, index){
          if (product.id == data.id) {
            scope.products[index] = data;
          }
        });
      } else if (data.state == "destroy") {
        scope.products.forEach(function(product, index){
          if (product.id == data.id) {
            scope.products.splice(index, 1);
          }
        });
      }
    });
  };

  function findProduct(productObject){
    scope.products.forEach(function(product, index){
      if (product.id == productObject.id) {
        return index;
      }
    });
  }

};

ProductService.$inject = ['$rootScope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$interval', '$controller', 'Product'];

storeApp.service("ProductService", ProductService);