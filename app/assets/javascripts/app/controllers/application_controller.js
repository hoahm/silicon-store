"use strict";
var scope ={};
var ApplicationController = function($scope, $http, $modal, ApplicationService){

  $http.defaults.headers.post["Content-Type"] = "application/json";

  scope = $scope;

  ApplicationService.initializeScope($scope);

  $scope.failure = function(response, form) {
    ApplicationService.failure(response, form);
  };

  $scope.hasPermission = function(resourceObject, roleName){
    return ApplicationService.hasPermission(resourceObject, roleName);
  };

};

ApplicationController.$inject = ['$scope', '$http', '$modal', 'ApplicationService'];

storeApp.controller("ApplicationController", ApplicationController);