var queryMakerFactory = function () {
  var queryMaker = {};

  queryMaker.set = function (json) {
    queryMaker.query = json;
  };

  queryMaker.make = function (text) {
    console.log('making..')
    text = text.toLowerCase();
    return queryMaker.query ? queryMaker.query : {
      "query": {
        bool: {
          should: [
            {
              "term": {
                "fullName": text
              }
            },
            {
              "term": {
                "userName": text
              }
            },
            {
              "term": {
                "twScreenName": text
              }
            },
            {
              "multi_match": {
                "query": text,
                "fields": ["fullName", "userName", "twScreenName"]
              }
            }
          ]
        }
      },
      "highlight": {
        "fields": {
          "fullName": {},
          "twScreenName": {},
          userName: {}
        }
      }
    }
  }

  return queryMaker;
}

var appbaseSearchFactory = function ($http, queryMaker) {
  return {
    search: function (text, callback) {
      var req = {
        method: 'POST',
        url: 'https://api.appbase.io/' + config.ab.app + '/v2_1/~rawsearch',
        headers: {
          'Content-Type': "application/json",
          'Appbase-Secret': config.ab.secret
        },
        data: {
          query: {
            namespaces: ["partner_new_data"],
            "body": queryMaker.make(text)
          }
        }
      }

      $http(req).success(callback.bind(null, null)).error(callback);
    }
  }
}

var ESearchFactory = function ($http, queryMaker) {
  return {
    search: function (text, callback) {
      var req = {
        method: 'POST',
        url: config.es.url + '/_search',
        headers: {
          'Content-Type': "application/json"
        },
        data: queryMaker.make(text)
      }

      console.log('posting..');

      $http(req).success(callback.bind(null, null)).error(callback);
    }

  }
}