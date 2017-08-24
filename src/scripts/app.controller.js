sliderApp = angular.module("sliderApp");
sliderApp.factory('BarsService', function($http) {
  var myService = {
    async: function() {
      var promise = $http.get('http://pb-api.herokuapp.com/bars').then(function(response) {
        console.log(response);
        return response.data;
      });
      return promise;
    }
  };
  return myService;

}).controller('AppCtrl', ['$scope', 'BarsService', function($scope, BarsService) {
  $scope.newProgressValues = [];
  BarsService.async().then(function(d) {
    $scope.apiData = d;
    $scope.newProgressValues = d.bars;
  });
  $scope.changeProgress = function(changeVal) {
    var newProgressValue = parseInt($scope.apiData.bars[$scope.selectedProgress]) + parseInt(changeVal);
    newProgressValue = (newProgressValue < 0) ? 0 : newProgressValue;
    $scope.apiData.bars[$scope.selectedProgress] = $scope.newProgressValues[$scope.selectedProgress] = newProgressValue;
  };
}]);