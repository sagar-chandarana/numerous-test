var es = require('elasticsearch');

module.exports = {
  uuid: function () {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  },
  es: function (host, noDebug) {
    var esConfig = {
      host: host
    };
    esConfig.log = noDebug ? undefined : 'debug';
    return new es.Client(esConfig);
  },
  log: function () {
    console.log(JSON.stringify(arguments, null, 3));
  },
  clog: console.log.bind(console)
}