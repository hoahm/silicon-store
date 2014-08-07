"use strict";

var HomeController = function($scope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, ProductService, CategoryService, $interval){

  $controller('ApplicationController', { $scope: $scope, $http: $http });

  CategoryService.initializeScope($scope);
  ProductService.initializeScope($scope);
  ProductService.syncRealTime();

  if ($state.current.name === "/"){
    CategoryService.getCategories();
    ProductService.loadSliser();
    ProductService.getProducts();
    ProductService.loadFeatureProduct();
  };

  $scope.filterProduct = function(self){
    ProductService.filterProduct(self);
  };

};

HomeController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'ProductService', 'CategoryService', '$interval'];

storeApp.controller("HomeController", HomeController);