"use strict";

var storeCsrfConfig = function($httpProvider){
  var authToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  return $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken;
};

storeCsrfConfig.$inject = ['$httpProvider'];

storeApp.config(storeCsrfConfig);