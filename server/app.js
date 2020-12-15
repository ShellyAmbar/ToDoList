const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const path = require("path");
const db = require("./db");
const collection = "todo";
const PORT = 8080;


app.get("/getToDos", (req, res) => {
  console.log("in get todos in server");
 
  db.getDB()
    .collection(collection)
    .find({})
    .toArray((err, documents) => {
      if (err) {
        console.log(err,"error in server");
      
      } else {
        console.log(documents, "in app.js server");
       return res.json(documents);
      }
    });
});

db.connect((err) => {
  if (err) {
    console.log(err, "Unable to connect to database.");
  } else {
    app.listen(PORT, () => {
      console.log(`Connected to database, app listening on port: ${PORT}`);
    });
  }
});

app.put("/:id", (req, res) => {
  const todoId = req.params.id;
  const userInput = req.body;

  db.getDB()
    .collection(collection)
    .findOneAndUpdate(
      { _id: db.getPrimaryKey(todoId) },
      { $set: { todo: userInput.todo } },
      { returnOriginal: false },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      }
    );
});

app.delete("/:id", (req, res) => {
  const todoId = req.params.id;

  db.getDB()
    .collection(collection)
    .findOneAndDelete({ _id: db.getPrimaryKey(todoId) }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
});

app.post("/", (req, res) => {
  const userInput = req.body;
  db.getDB()
    .collection(collection)
    .insertOne(userInput, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ result, document: result.ops[0] });
      }
    });
});
