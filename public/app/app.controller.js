angular.module('myApp').controller('AppCtrl', function($scope, $http) { 
    $scope.apiData = null; 
	$scope.newProgressValues = [];
    $http({
		url: 'http://pb-api.herokuapp.com/bars',
		method: 'GET',
		dataType: 'json', 
		headers: {}
	}).success(function (data, status) {
		$scope.apiData = data;
		$scope.newProgressValues = data.bars;
	}); 

    $scope.changeProgress = function(changeVal) {         		
         let newProgressValue = parseInt($scope.apiData.bars[$scope.selectedProgress]) + parseInt(changeVal);
		 newProgressValue = (newProgressValue < 0 ) ? 0 : newProgressValue;
		 $scope.apiData.bars[$scope.selectedProgress] = $scope.newProgressValues[$scope.selectedProgress] = newProgressValue;
	};
});
