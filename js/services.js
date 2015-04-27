var queryMakerFactory = function () {
  var queryMaker = {};

  queryMaker.set = function (json) {
    queryMaker.query = json;
  };

  queryMaker.make = function (text) {
    console.log('making..')
    text = text.toLowerCase();
    return queryMaker.query ? queryMaker.query : {
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
                  match: {
                    text: {
                      query: text,
                      fuzziness: .9
                    }
                  }
                },
                {
                  term: {
                    "text.ngram" : text
                  }
                },
                {
                  match: {
                    "text.ngram": {
                      query: text,
                      fuzziness: .9
                    }
                  }
                },
                {
                  match: {
                    description: {
                      query: text,
                      fuzziness: .9
                    }
                  }
                },
                {
                  term: {
                    "description.ngram": text
                  }
                },
                {
                  term: {
                    "titulo.ngram": {
                      value: text,
                      boost: 30.0
                    }
                  }
                },
                {
                  match: {
                    titulo: {
                      query: text,
                      fuzziness: .9,
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
          "text.ngram":{},
          "description": {},
          "description.ngram":{},
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