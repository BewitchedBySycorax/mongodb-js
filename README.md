There are 2 collections here. Need to write JS code that fulfills next steps:

1. Connect to local MongoDB database (database name does not matter)
2. Insert json data to the database (collection names does not matter) in separated collections
3. Extract longitude and latitude from ‘location.ll’ in each document and add them to the root of the current document as separated fields (‘longitude’, ‘latitude’). Values in array may be invalid as coordinates, it does not matter
4. For each document from the first collection, find document from the second collection by country respectively and count difference between overall students count and current students count (in the current document from first collection) and write result to the current document as separated field
5. Find documents count by countries
6. Write result to third collection to the current database

Important notes:

1. Steps from 3 must be fulfilled as one MongoDB aggregation pipeline
2. Result fields of 3d collection documents must contain:
    - _id: country
    - allDiffs: array of results from step 4
    - count: documents count by countries from step 5
    - longitude: array of longitudes from step 3
    - latitude: array of latitudes from step 3
3. Write README.md with instructions how to launch code and push code to GitHub
4. Use new ECMAScript standarts