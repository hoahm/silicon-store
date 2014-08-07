"use strict";

var ProductsController = function($scope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, ProductService, CategoryService){

  $controller('ApplicationController', { $scope: $scope, $http: $http });

  CategoryService.initializeScope($scope);
  ProductService.initializeScope($scope);
  CategoryService.getCategories();
  ProductService.syncRealTime();

  if ($state.current.name === "products"){
    ProductService.getProducts();
  };

  if ($state.current.name === "new_product"){

  };

  if ($state.current.name === "edit_product"){

  };

  if ($state.current.name === "product"){
    ProductService.getProduct();
  };

  $scope.filterProduct = function(self){
    ProductService.filterProduct(self);
  };

};

ProductsController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'ProductService', 'CategoryService'];

storeApp.controller("ProductsController", ProductsController);