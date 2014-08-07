"use strict";

var ProductService = function($rootScope, $http, $location, $state, $stateParams, $filter, $timeout, $interval, $controller, Product){

  var scope = {};

  this.initializeScope = function(scopeObject){
    scope = scopeObject;
    scope.products = {};
    scope.page = 1;
    scope.totalPages = 1;
    scope.search = {};
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
    var socket = io.connect('http://silicon-store-server.herokuapp.com:80');

    socket.on('message', function (response) {
      var data = JSON.parse(response);

      if (data.state == "created"){
        if (angular.isArray(scope.products)){
          scope.products.push(data);
        }
      } else if (data.state == "update") {
        if (angular.isArray(scope.products)){
          scope.products.forEach(function(product, index){
            if (product.id == data.id) {
              scope.products[index] = data;
            }
          });
        }
        if (angular.isDefined(scope.product) && scope.product.id == data.id){
          scope.product = data;
        }
      } else if (data.state == "destroy") {
        scope.products.forEach(function(product, index){
          if (product.id == data.id) {
            scope.products.splice(index, 1);
          }
        });
      }
    });
  };

  this.getProduct = function(){
    Product.get({
      id: $stateParams['id']
    }, function(response){
      scope.product = response;
      if ($('.input-qty').length > 0){
        $('.input-qty').TouchSpin();
      }
    });
  };

  this.filterProduct = function(scopeObject){
    scope.search.category = scopeObject.category.id;
  };

};

ProductService.$inject = ['$rootScope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$interval', '$controller', 'Product'];

storeApp.service("ProductService", ProductService);