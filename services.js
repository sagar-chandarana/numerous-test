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
          query: {
            namespaces: ["partner"],
            "body": {
              query: {
                bool: {
                  should: [{
                      "wildcard": {
                        "texto_frame": text !== "" ? "*" + text + "*" : null
                      }
                    }, {
                      match: {
                        texto_frame : {
                          query: text,
                          "fuzziness" : 1
                        }
                      }
                    }
                  ]
                }
              },
              "highlight": {
                "fields": {
                  "texto_frame": {}
                }
              }
            }
          }
        }
      }

      $http(req).success(callback.bind(null, null)).error(callback);
    }
  }
}