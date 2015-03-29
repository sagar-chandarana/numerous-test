angular.module('Meluiz', ['ngSanitize'])
.controller('body', [ "$scope" , "appbaseSearch", bodyCtrl])
.factory('appbaseSearch', ["$http", appbaseSearchFactory]);