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
    $http.get('/products.json',
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

};

ProductService.$inject = ['$rootScope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$interval', '$controller', 'Product'];

storeApp.service("ProductService", ProductService);