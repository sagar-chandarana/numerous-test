var util = require('./util.js');
var config = require('./config.js');
var es = util.es(config.es.host);
var opsToPerform = [];
var async = require("async");

var store = function (collection, data, id) {
  opsToPerform.push(function (callback) {
    es.create({
      index: config.es.index,
      type: collection,
      body: data,
      id: data["_id"] ? data["_id"] : util.uuid()
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