module.exports = {
  "data": {
    "sets": [{
      "collection": "users",
      "objs": require('./data/data.json')
    }]
  },
  "es": {
    "host": "ivy.sagar.ch:9200",
    "index": "numerous_ivy1"
  },
  "ab": {
    "app": "numerous_2",
    "secret": ""
  }
}