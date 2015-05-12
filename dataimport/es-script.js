var util = require(__dirname + '/util.js');
var config = require( __dirname + '/config.js');
var es = util.es(config.es.host);
var opsToPerform = [];
var async = require("async");
var argv = require('minimist')(process.argv);

config.es.index = argv.index? argv.index : config.es.index;
config.es.host =  argv.host? argv.host : config.es.host;

var store = function (collection, data, id) {
  opsToPerform.push(function (callback) {
    es.create({
      index: config.es.index,
      type: collection,
      body: data,
      id: data["_id"] ? data["_id"] : (data["id"] ? data["id"] : id)
    }, callback);
  });
}

var batch = function (collection, array) {
  array.forEach(store.bind(null, collection));
}

config.data.sets.forEach(function (dataset) {
  batch(dataset.collection, dataset.objs);
});

async.parallelLimit(opsToPerform, 100, function (err) {
  err? console.log(err): console.log('SUCCESS');
});