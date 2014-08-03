"use strict";

var storePushStateConfig = function($locationProvider){
  return $locationProvider.html5Mode(true);
};

storePushStateConfig.$inject = ['$locationProvider'];

storeApp.config(storePushStateConfig);