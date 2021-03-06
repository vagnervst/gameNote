var gnControllers = angular.module('gnControllers', [])

.controller('HomePageController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    $http.get('js/data.json').success(function(data) {
        $scope.gamesList = data;
        $scope.title = 'Home'; 
        $scope.gameId = $routeParams.gameId;
        $scope.gamedbId = Number($scope.gameId)+1;
        
        var nextId = 0;
        var prevId = 0;
        
        if( Number($scope.gameId) === $scope.gamesList.length-1 ) {
            nextId = 0;
        } else {
            nextId = Number($scope.gameId)+1;
        }
        
        if( Number($scope.gameId) === 0 ) {
            prevId = $scope.gamesList.length-1;
        } else {
            prevId = Number($scope.gameId)-1;
        }
        
        $scope.prevId = prevId;
        $scope.nextId = nextId;    
    });    
}]);