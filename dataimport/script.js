appbase = require('appbasejs');
appbase.credentials('meliuzmock','85acf56fc7b30e24078ffd4163d64e2a');
async = require('async');

partners = [require('./me_reembolso.json')];

var opsToPerform = [];

var store = function (namespace, data) {
  opsToPerform.push(function (callback) {
    appbase.ns(namespace).v(appbase.uuid()).setData(data, callback);
  });
}

var batch = function (namespace, array) {
  array.forEach(store.bind(null, namespace));
}

partners.forEach(batch.bind(null, 'partner_new_data'));

async.parallelLimit(opsToPerform, 100, function (err) {
  console.log(err);
});