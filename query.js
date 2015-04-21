 {
   "query": {
     "bool": {
       "should": [
         {
           "match": {
             "simple": "belezanaweb"
           }
         },
         {
           "match": {
             "extended": "belezanaweb"
           }
         }
        ]
     }
   },
   "fields": ["id"],
   "highlight": {
     "fields": {
       "text": {}
     }
   }
 }