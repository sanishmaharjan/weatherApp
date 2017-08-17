app.controller('HomeController', function ($rootScope, $scope, commonFactory) {
    $rootScope.showPageLoading = true;
    $rootScope.init();
    $scope.searchFormData = {};
    $scope.addressData = {};
    $scope.weatherData = {};

    $scope.findCurrentIpAddress = function () {
        $rootScope.showPageLoading = true;
        commonFactory.findCurrentIpAddress(function (data) {
            $scope.findAddressByIp(data.ip);
        }, function (error) {
            $scope.findAddressByIp(null);
            console.log(error);
        });
    };

    $scope.findAddressByIp = function (ipAddress) {
        $rootScope.showPageLoading = true;
        commonFactory.findAddressByIp(ipAddress,
            function (data) {
                $scope.addressData = data;
                $scope.searchFormData = {
                    "city": $scope.addressData.city
                };
                $scope.findCityWeather($scope.searchFormData.city);
            }, function (error) {
                $rootScope.showPageLoading = false;
                console.log(error);
            });
    };

    $scope.findCityWeather = function (city) {
        $rootScope.showPageLoading = true;
        commonFactory.findCityWeather(city, function (data) {
            $rootScope.showPageLoading = false;
            $scope.weatherData = data;
        }, function (error) {
            $rootScope.showPageLoading = false;
            console.log(error);
        });
    };

    $scope.searchCityWeather = function () {
        $scope.findCityWeather($scope.searchFormData.city);
    };

    $scope.findWindDriection = function (deg) {
        var val = Math.floor((85.501 / 45) + 0.5);
        var arr = ["North", "NorthEast", "East", "SouthEast", "South", "SouthWest", "West", "NorthWest"];
        return arr[(val % 8)];
    };

    $scope.getHourFromTimestamp = function (timestamp) {
        var date = new Date(timestamp * 1000);
        var hour = date.getHours() % 12;
        return hour != 0 ? hour : 12;
    };

    $scope.getUpdateTime = function (timestamp) {
        var currentDate = new Date();
        var updatedDate = new Date(1475843527 * 1000);

        var difference = parseInt((currentDate.getTime() - updatedDate.getTime()) / (60 * 1000));
        var hour = Math.floor(difference / 60);
        var min = difference % 60;
        var updateTime = (hour != 0) ? hour + 'hr ' + min + ' min' : min + 'min';
        return updateTime;
    };

    $scope.findCurrentIpAddress();
});