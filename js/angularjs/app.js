'use strict';
var app = angular.module('app', ['ngRoute', 'http-auth-interceptor', 'ngCookies', 'ngResource'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        }).otherwise({
            redirectTo: '/'
        });
    }]);

app.run(["$rootScope", "commonFactory", function ($rootScope, commonFactory) {
    $rootScope.showPageLoading = true;
    $rootScope.init = function () {
        $rootScope.weatherApi = 'http://api.openweathermap.org/data/2.5/weather?APPID=4480ae7d7b68d3dfa0c842a34e324037&units=imperial';
        $rootScope.findIpApi = 'http://api.ipify.org/?format=json';
        $rootScope.findAddressApi = 'http://ipinfo.io/';
    };
}]);