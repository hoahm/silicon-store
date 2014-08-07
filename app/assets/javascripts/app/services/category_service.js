"use strict";

var CategoryService = function($rootScope, $http, $location, $state, $stateParams, $filter, $timeout, $controller, Category){

  var scope = {};

  this.initializeScope = function(scopeObject){
    scope = scopeObject;
    scope.categories = {};
  };

  this.getCategories = function(){
    if (localStorage.getItem("categories") != null && localStorage.getItem("categories") != "undefined"){
      var categories = JSON.parse(localStorage.getItem("categories"));
      scope.categories = categories;
    }

    if ($.isEmptyObject(scope.categories)){
      $http.get(Routes.categories_path({format: 'json'}),
        {}
      )
      .success(function(response){
        scope.categories = response;
        localStorage.setItem("categories", JSON.stringify(response));
      })
      .error(function(response, status){
        // Handler error
      });
    }

  };

};

CategoryService.$inject = ['$rootScope', '$http', '$location', '$state', '$stateParams', '$filter', '$timeout', '$controller', 'Category'];

storeApp.service("CategoryService", CategoryService);