"use strict";

var storeRouteConfig = function($stateProvider, $urlRouterProvider){

  // Default route: all invalid route will be redirected to root
  $urlRouterProvider.otherwise("/");

  // Define app states
  return $stateProvider;

};

storeRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

storeApp.config(storeRouteConfig);