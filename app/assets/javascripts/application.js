// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require i18n
//= require i18n/translations
//= require js-routes
//= require moment
//= require socket.io

//-----------------------------
// AngularJS -1.2.21
//= require angular
//= require angular-resource

// Angular UI Router - 0.2.10
//= require angular-ui-router

// Angular UI Bootstrap - 0.11.0
//= require angular-ui-bootstrap-tpls

// Angular InfiniteScroll - 1.0.0
//= require ng-infinite-scroll

// Angular Moment - 0.7.1
//= require angular-moment

//-----------------------------
// storeApp Specific JS Files
//= require app/app
//= require_tree ./app/controllers
//= require_tree ./app/resources
//= require_tree ./app/services
//= require_tree ./app/filters
//= require_tree ./config

//-----------------------------
// Vendor JS Files
//= require bootstrap-datetimepicker
//= require jquery.validate
//= require jquery.bxslider
//= require jquery.bootstrap-touchspin
//= require common
//= require users
// require turbolinks
// require_tree .