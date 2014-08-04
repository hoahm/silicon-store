"use strict";

var ProductsController = function($scope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, ProductService, CategoryService){

  $controller('ApplicationController', { $scope: $scope, $http: $http });

  ProductService.initializeScope($scope);
  CategoryService.initializeScope($scope);

  if ($state.current.name === "products"){
    CategoryService.getCategories();
    ProductService.getProducts();
  };

  if ($state.current.name === "new_product"){
    console.log("new_product");
  };

  if ($state.current.name === "edit_product"){
    console.log("edit_product");
  };

  if ($state.current.name === "product"){
    console.log("product");
  };

};

ProductsController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'ProductService', 'CategoryService'];

storeApp.controller("ProductsController", ProductsController);