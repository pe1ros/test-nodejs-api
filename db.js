const MongoClient = require("mongodb").MongoClient;
const dbConnectionURL =
  "mongodb+srv://ez:123@mongo-test.h7fla.mongodb.net/<dbname>?retryWrites=true&w=majority";
function initialize(
  dbName,
  dbCollectionName,
  successCallback,
  failureCallback
) {
  MongoClient.connect(dbConnectionURL, function (err, dbInstance) {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err);
    } else {
      const dbObject = dbInstance.db(dbName);
      const dbCollection = dbObject.collection(dbCollectionName);
      console.log("[MongoDB connection] SUCCESS");

      successCallback(dbCollection);
    }
  });
}
module.exports = { initialize };
