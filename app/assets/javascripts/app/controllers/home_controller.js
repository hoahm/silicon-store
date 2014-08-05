"use strict";

var HomeController = function($scope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, ProductService, CategoryService, $interval){

  $controller('ApplicationController', { $scope: $scope, $http: $http });

  ProductService.initializeScope($scope);
  CategoryService.initializeScope($scope);

  if ($state.current.name === "/"){
    CategoryService.getCategories();
    ProductService.loadSliser();
    ProductService.getProducts();
    ProductService.loadFeatureProduct();
    ProductService.syncRealTime();
  };

};

HomeController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'ProductService', 'CategoryService', '$interval'];

storeApp.controller("HomeController", HomeController);