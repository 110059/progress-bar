var sliderApp = angular.module("sliderApp", ["ngRoute"]);
sliderApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      url: '/',
      templateUrl: 'partials/app.html',
      controller: 'AppCtrl'
    })
});