var bodyCtrl = function ($scope, appbaseSearch, ESearch, queryMaker) {
  var container = document.getElementById("jsoneditor");
  editor = new JSONEditor(container);
  editor.setMode('code');
  
  $scope.setQuery = function() {
    $scope.modifiedQuery = true;
    
    try {
      queryMaker.set(editor.get());
    } catch (c) {
      console.log(c);
    }
  }
  
  $scope.search = function () {
    if ($scope.text !== "") {
      console.log('querying..')
      var chosenSource = config.chooseES? ESearch : appbaseSearch;
      chosenSource.search($scope.text, function (error, results) {
        if (error) {
          return console.log(error);
        }

        console.log('---------------------');
        /*
        results.hits.hits.forEach(function (partner, i) {
          //console.log(i, partner._score, partner._source.cashback, partner._source.clicks, partner._source.total_sale);
          console.log(partner._source.titulo,
            function () {
              var spaces = "";
              for (i = (18 - partner._source.titulo.length); i > 0; i--) {
                spaces += " "
              };
              return spaces;
            }(),
            partner._score,
            function () {
              var spaces = "";
              for (i = (12 - String(partner._score).length); i > 0; i--) {
                spaces += " "
              };
              return spaces;
            }(),
            partner._source.cashback);
        })
        */
        console.log(results.hits.hits);
        console.log('---------------------');

        $scope.users = results.hits.hits;
      })
    } else {
      $scope.users = [];
    }
  }

  $scope.$watch('text', function (newValue, oldValue) {
    $scope.search();
    editor.set($scope.text !== "" ? queryMaker.make($scope.text) : {})
  });

  $scope.text = "charliewood";
}