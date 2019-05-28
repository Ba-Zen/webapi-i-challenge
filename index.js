// implement your API here
const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json()); // make POST and PUT work

// Get - Return all users in db
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
// Get users by id - return specific user in db
server.get("api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    });
});


// POST - Create a user 
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error creating user" });
    });
});

// DELETE - the D in CRUD
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then(deleted => {
      res.status(204).end(); 
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

// PUT - the U in CRUD
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    });
});

server.listen(4000, () => {
  console.log("\n** API is up and running on port 4k **");
});
