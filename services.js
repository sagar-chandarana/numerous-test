var queryMakerFactory = function () {
  return {
    make: function (text) {
      return {
        "sort": [
                /*{
                  "is_commissioned": "desc"
                },*/
                "_score"
              ],
        query: {
          "function_score": {
            query: {
              bool: {
                should: [
                  {
                    "wildcard": {
                      "text": "*" + text + "*"
                    }
                  }, {
                    match: {
                      text: {
                        query: text
                      }
                    }
                  },
                  {
                    "wildcard": {
                      "description": "*" + text + "*"
                    }
                  }, {
                    match: {
                      description: {
                        query: text
                      }
                    }
                  }, {
                    "wildcard": {
                      "titulo": {
                        "value": "*" + text + "*",
                        "boost": 30.0
                      }
                    }
                  }, {
                    match: {
                      titulo: {
                        query: text,
                        fuzziness: 1,
                        "operator": "and",
                        boost: 30.0
                      }
                    }
                  }
                ]
              }
            },
            functions: [
                    /*{
                      "field_value_factor": {
                        "field": "cashback",
                        "factor": 3,
                        "modifier": "log"
                      }
                    }*/
                  ]
          }
        },
        "highlight": {
          "fields": {
            "text": {},
            "description": {}
          }
        }
      }
    }

  }
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
      $http(req).success(callback.bind(null, null)).error(callback);
    }

  }
}