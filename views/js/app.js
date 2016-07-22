var app = angular.module('gNote', ['ngRoute', 'gnControllers'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/:gameId', {
        templateUrl: 'partials/gamePreview.html',
        controller: 'HomePageController'
    }).
    when('/game/:gameId', {
        templateUrl: 'partials/gamePage.html',
        controller: 'GamePageController'
    }).
    otherwise({
        redirectTo: '/0'
    })
}]);