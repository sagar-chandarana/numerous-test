var bodyCtrl = function ($scope, search) {
  $scope.search = function () {
    search.search($scope.text, function (error, results) {
      if (error) {
        return console.log(error);
      }
      console.log(results);
      $scope.partners = results.hits.hits;
    })
  }

  $scope.$watch('text', function (newValue, oldValue) {
    $scope.search();
  });

  $scope.text = "iphone";
}