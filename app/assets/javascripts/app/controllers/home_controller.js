"use strict";
var fayer = {};
var HomeController = function($scope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, ProductService, CategoryService, $interval){

  $controller('ApplicationController', { $scope: $scope, $http: $http });

  ProductService.initializeScope($scope);
  CategoryService.initializeScope($scope);

  if ($state.current.name === "/"){
    CategoryService.getCategories();
    ProductService.loadSliser();
    ProductService.getProducts();
    ProductService.loadFeatureProduct();

    var client = new Faye.Client('/faye');
    fayer = client;
    console.log("init faye");

    client.subscribe("/category", function(payload){
      console.log(payload);
    });


  };

};

HomeController.$inject = ['$scope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'ProductService', 'CategoryService', '$interval'];

storeApp.controller("HomeController", HomeController);