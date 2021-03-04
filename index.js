const MongoClient = require('mongodb').MongoClient

const URL = 'mongodb://127.0.0.1:27017/mongodb-js-test'

const client = new MongoClient(URL, { useNewUrlParser: true, useUnifiedTopology: true })

;(async () => {
  try {
    // const collection1WithModifiedCoordinates = (await ((await (client.connect()))
    //   .db()
    //   .aggregate([
    //     {
    //       $lookup: {
    //         from: "collection2",
    //         localField: "country",
    //         foreignField: "country",
    //         as: "collection2data",
    //       },
    //     }
    //   ]))
    //   .toArray())
    //     .map(({ location, ...element }) =>
    //       ({ ...element, longitude: location.ll[0], latitude: location.ll[1] }))

    const result = (await ((await (client.connect()))
      .db()
      .collection('collection1')
      .aggregate([
        {
          $addFields: {
            temporaryLocationArray: { $objectToArray: "$location" },
            longitude: {
              $map: {
                input: "$temporaryLocationArray", // temporaryLocationArray: [{"k":"ll","v":[-143.772,-77.228]}]
                as: "coordinates",
                in: {
                  $allElementsTrue: {
                    $map: {
                      input: "$$coordinates.v",
                      as: "longitudeValue",
                      in: { $first: "$$longitudeValue" }
                    }
                  }
                }
              }
            },
            latitude: {
              $map: {
                input: "$temporaryLocationArray", // temporaryLocationArray: [{"k":"ll","v":[-143.772,-77.228]}]
                as: "coordinates",
                in: {
                  $allElementsTrue: {
                    $map: {
                      input: "$$coordinates.v",
                      as: "latitudeValue",
                      in: { $last: "$$latitudeValue" }
                    }
                  }
                }
              }
            },
          }
        },
        {
          $lookup: {
            from: "collection2",
            localField: "country",
            foreignField: "country",
            as: "collection2data",
          },
        }
      ]))
      .toArray())

    console.log(result)
    // console.log(JSON.stringify(result))

  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
})()
