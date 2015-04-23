module.exports = {
  "data": {
    "sets": [{
      "collection": "partner",
      "objs": require('./data/me_reembolso.json')
    }]
  },
  "es": {
    "host": "ivy.sagar.ch:9200",
    "index": "meliuz-ivy1"
  },
  "ab": {
    "app": "meliuzmock",
    "secret": "85acf56fc7b30e24078ffd4163d64e2a"
  }
}