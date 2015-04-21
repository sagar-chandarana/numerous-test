module.exports = {
  "data": {
    "sets": [{
      "collection": "records",
      "objs": require('./data/me_reembolso.json')
    }]
  },
  "es": {
    "host": "localhost:9200",
    "index": "meliuztest"
  },
  "ab": {
    "app": "meliuzmock",
    "secret": "85acf56fc7b30e24078ffd4163d64e2a"
  }
}