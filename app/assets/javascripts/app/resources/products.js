"use strict";

var Product = function($resource){

  return $resource(Routes.product_path(":id", {format: 'json'}), {
    id: "@id"
  }, {
    update: {
      method: "PUT"
    }
  });

};

Product.$inject = ['$resource'];

storeApp.factory("Product", Product);