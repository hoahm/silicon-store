"use strict";

var storeRouteConfig = function($stateProvider, $urlRouterProvider){

  // Default route: all invalid route will be redirected to root
  $urlRouterProvider.otherwise("/");

  // Define app states
  return $stateProvider

    .state("/", {
      url: "/",
      views: {
        "": {
          controller: "HomeController",
          templateUrl: "/assets/home/index.html.haml"
        }
      }
    })

    .state("products", {
      url: "/products",
      views: {
        "": {
          controller: "ProductsController",
          templateUrl: "/assets/products/index.html.haml"
        }
      }
    })
    .state("new_product", {
      url: "/products/new",
      views: {
        "": {
          controller: "ProductsController",
          templateUrl: "/assets/products/new.html.haml"
        }
      }
    })
    .state("edit_product", {
      url: "/products/:id/edit",
      views: {
        "": {
          controller: "ProductsController",
          templateUrl: "/assets/products/edit.html.haml"
        }
      }
    })
    .state("product", {
      url: "/products/:id",
      views: {
        "": {
          controller: "ProductsController",
          templateUrl: "/assets/products/show.html.haml"
        }
      }
    });

};

storeRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

storeApp.config(storeRouteConfig);