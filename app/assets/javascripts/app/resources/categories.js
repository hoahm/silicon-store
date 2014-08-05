"use strict";

var Category = function($resource){

  return $resource("/categories/:id.json", {
    id: "@id"
  }, {
    update: {
      method: "PUT"
    }
  });

};

Category.$inject = ['$resource'];

storeApp.factory("Category", Category);