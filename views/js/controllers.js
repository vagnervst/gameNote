var gnControllers = angular.module('gnControllers', [])

.controller('HomePageController', ['$scope', '$http', function($scope, $http) {
    $scope.title = 'Home';
}]);