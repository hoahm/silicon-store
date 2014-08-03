"use strict";

var ApplicationService = function($rootScope, $http, $modal){

  var scope = {};

  this.initializeScope = function(scopeObject){
    scope = scopeObject;
  };

  this.failure = function(response, form){
    angular.forEach(response.data, function(errors, key) {
      var result = [];

      angular.forEach(errors, function(e) {
        form[key].$dirty = true;
        form[key].$setValidity(e, false);
        result.push(e);
      });
      form[key].errorMessage = key + " " + result.join(", ");
    });
  };

  this.hasPermission = function(resourceObject, roleName){
    roleName = roleName || "";

    if (resourceObject == null || resourceObject == "undefined" || typeof(resourceObject) != "object"){
      return false;
    }

    if (typeof(resourceObject.is_owner) != "undefined" && resourceObject.is_owner){
      return true;
    }

    if (typeof(resourceObject.role) != "undefined" && resourceObject.role == roleName){
      return true;
    }

    return false;
  };

};

ApplicationService.$inject = ['$rootScope', '$http', '$modal'];

storeApp.service("ApplicationService", ApplicationService);