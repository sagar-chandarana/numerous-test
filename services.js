var appbaseSearchFactory = function ($http) {
  return {
    search: function (text, callback) {
      var req = {
        method: 'POST',
        url: 'https://api.appbase.io/meliuzmock/v2_1/~rawsearch',
        headers: {
          'Content-Type': "application/json",
          'Appbase-Secret': "85acf56fc7b30e24078ffd4163d64e2a"
        },
        data: {
          query: !window.que ? {
            namespaces: ["partner_new_data"],
            "body": {
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
                              query: text,
                              "fuzziness": 1,
                              "operator" : "and"
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
                              "operator" : "and",
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
                  "text": {}
                }
              }
            }
          } : window.que
        }
      }

      $http(req).success(callback.bind(null, null)).error(callback);
    }
  }
}