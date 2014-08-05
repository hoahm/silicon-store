"use strict";

var Product = function($resource){

  return $resource("/products/:id.json", {
    id: "@id"
  }, {
    update: {
      method: "PUT"
    }
  });

};

Product.$inject = ['$resource'];

storeApp.factory("Product", Product);