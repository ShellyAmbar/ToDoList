const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dbName = "ToDoList";
const url = "mongodb://localhost:27017";
const mongoOptions = {useUnifiedTopology: true, useNewUrlParser: true };

const state = {
  db: null,
};

const connect = (callback) => {
  if (state.db) {
    callback();
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        callback(err);
      } else {
        state.db = client.db(dbName);
        callback();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectId(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = { getDB, connect, getPrimaryKey };
