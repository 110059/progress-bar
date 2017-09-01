var sliderApp = angular.module("sliderApp", ["ngRoute"]);
sliderApp.config(function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider
    .when("/", {
      url: '/',
      templateUrl: 'partials/app.html',
      controller: 'AppCtrl'
    })
    .when("/users", {
      url: '/users',
      templateUrl: 'partials/users.html',
      controller: 'userCtrl'
    })
    .otherwise({
    redirectTo: '/'
    });

}).run();
