var fs = require('fs');
var express = require('express');
var _ = require('underscore');
var app = express();

app.use(express.bodyParser());

var FILENAME = "./db_data.json";

var todos = [];

function load(success) {
  fs.exists(FILENAME, function (exists) {
    if(!exists) { return; }

    fs.readFile(FILENAME, function (err, data) {
      if (err) throw err;

      try {
        todos = JSON.parse(data);
        success();
      } catch(e) {
        console.log("Could not read the file, it might be corrupted", e);
        console.log("Creating a new empty file");
        save(function() {
          console.log("Successfully created a new clean file");
          success();
        });
      }
    });
  });
}

function save(success) {
  var data = todos;
  fs.writeFile(FILENAME, JSON.stringify(data), function(err) {
    if(err) { throw err; }

    console.log("Saved latest changes to file");

    success();
  }); 
}

// Create
app.post('/todos', function(req, res) {
  var contentType = req.headers['content-type'];
  if(req.headers['content-type'] !== "application/json") {
    return res.send(400, "request content type was " + contentType + ", should be application/json");
  }

  var body = req.body;
  var id = Date.now();
  var newItem = {
    title : body.title,
    done : body.done || false,
    id: id
  }

  todos.push(newItem);
  save(function() {
    console.log("Created new item", newItem);
    return res.send(201, newItem);
  });
});

// Read
app.get('/todos', function(req, res){
  console.log("Returning all items");
  return res.send(todos);
});

// Update
app.put('/todos/:id', function(req, res){
  var contentType = req.headers['content-type'];
  if(req.headers['content-type'] !== "application/json") {
    return res.send(400, "request content type was " + contentType + ", should be application/json");
  }

  var itemToUpdate = _.find(todos, function(todo) {
    console.log(todo.id);
    return todo.id === Number(req.params.id);
  });

  if(!itemToUpdate) {
    return res.send(404);
  }

  itemToUpdate.title = req.body.title || itemToUpdate.title;
  itemToUpdate.done = req.body.done || itemToUpdate.done;

  save(function() {
    console.log("Updated item", itemToUpdate);
    return res.send(204);
  });
});

// Delete
app.del('/todos/:id', function(req, res){
  var itemToDelete = _.find(todos, function(item) {
    return item.id === Number(req.params.id);
  });

  todos = _.without(todos, itemToDelete);

  save(function() {
    console.log("Deleted item", itemToDelete);
    return res.send(204);
  });
});

load(function() {
  console.log("Loaded", todos.length, "items from file");
  console.log(todos);
  app.listen(3000);
  console.log('Listening on port 3000');
});