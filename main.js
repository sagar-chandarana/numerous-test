angular.module('Meliuz', ['ngSanitize'])
.controller('body', [ "$scope" , "appbaseSearch", bodyCtrl])
.factory('appbaseSearch', ["$http", appbaseSearchFactory]);