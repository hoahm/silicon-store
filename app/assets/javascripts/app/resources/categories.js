"use strict";

var Category = function($resource){

  return $resource(Routes.category_path(":id", {format: 'json'}), {
    id: "@id"
  }, {
    update: {
      method: "PUT"
    }
  });

};

Category.$inject = ['$resource'];

storeApp.factory("Category", Category);