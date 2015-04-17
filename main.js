angular.module('Meliuz', ['ngSanitize'])
.controller('body', [ "$scope" , "appbaseSearch", bodyCtrl])
.factory('appbaseSearch', ["$http", appbaseSearchFactory])
.filter('trustElement', function ($sce) {
    return function (value) {
        return $sce.trustAsHtml(value);
    };
});;