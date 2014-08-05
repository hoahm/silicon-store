"use strict";

var CategoryService = function($rootScope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, Category){

  var scope = {};

  this.initializeScope = function(scopeObject){
    scope = scopeObject;
    scope.categories = {};
  };

  this.getCategories = function(){
    $http.get('/categories.json',
      {}
    )
    .success(function(response){
      scope.categories = response;
    })
    .error(function(response, status){
      // Handler error
    });
  };

};

CategoryService.$inject = ['$rootScope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'Category'];

storeApp.service("CategoryService", CategoryService);