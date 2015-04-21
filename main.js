angular.module('Meliuz', ['ngSanitize'])
.factory('queryMaker', [queryMakerFactory])
.factory('appbaseSearch', ["$http", 'queryMaker', appbaseSearchFactory])
.factory('ESearch', ["$http", 'queryMaker', ESearchFactory])
.controller('body', [ "$scope" , "appbaseSearch", "ESearch", bodyCtrl])
.filter('trustElement', function ($sce) {
    return function (value) {
        return $sce.trustAsHtml(value);
    };
});;