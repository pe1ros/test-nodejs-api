const express = require("express");
const server = express();
const body_parser = require("body-parser");

server.use(body_parser.json());

const port = process.env.PORT || 4000;

const db = require("./db");
const dbName = "pictures";
const collectionName = "pictures";

db.initialize(
  dbName,
  collectionName,
  function (dbCollection) {
    server.get("/", (request, response) => {
      response.set("Access-Control-Allow-Origin", "*");

      dbCollection.find().toArray((error, result) => {
        if (error) {
          console.log(error);
        }
        response.status(200).json(result);
      });
    });
  },
  function (err) {
    throw err;
  }
);

server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
