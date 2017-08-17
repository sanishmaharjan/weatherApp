app.factory('commonFactory', function ($rootScope, $http, $location) {
    return {
        findCityWeather: function (city, successCallback, errorCallback) {
            $http({
                method: 'GET',
                url: $rootScope.weatherApi + '&q=' + city
            }).success(function (data) {
                return successCallback(data);
            }).error(function (error) {
                return errorCallback(error);
            });
        },
        findAddressByIp: function (ipAddress, successCallback, errorCallBack) {
            if (ipAddress != null) {
                var url = $rootScope.findAddressApi + ipAddress;
            } else {
                url = $rootScope.findAddressApi;
            }
            $http({
                method: 'GET',
                url: url
            }).success(function (data) {
                return successCallback(data);
            }).error(function (error) {
                return errorCallBack(error);
            });
        },
        findCurrentIpAddress: function (successCallback, errorCallBack) {
            $http({
                method: 'GET',
                url: $rootScope.findIpApi
            }).success(function (data) {
                return successCallback(data);
            }).error(function (error) {
                return errorCallBack(error);
            });
        }
    };
});