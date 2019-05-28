// implement your API here
const express = require("express");

const users = require("./data/db.js");

const server = express();

server.use(express.json()); // make POST and PUT work

const sendUserError = (status, message, res) => {
    // This is just a helper method that we'll use for sending errors when things go wrong.
    res.status(status).json({ errorMessage: message });
    return;
  };

// the R in CRUD
server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});
// Read by ID - unfinished
server.get('/api/users/:id', (req, res) => {
    users.findById().then(user => {
        res.status(200).json(user);
    })
})

// the C in CRUD
server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
      sendUserError(400, 'Must provide name and bio', res);
      return;
    }
    db  
      .insert({
        name,
        bio,
        created_at,
        updated_at
      })
      .then(response => {
        res.status(201).json(response);
      })
      .catch(error => {
        console.log(error);
        sendUserError(400, error, res);
        return;
      });
  });

// the D in CRUD
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.users.remove(id).then(deleted => {
        res.status(204).end();
    }).catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
    });
});

// the U in CRUD 
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.users.update(id, changes).then(updated => {
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }).catch(error => {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    });
});

server.listen(4000, () => {
  console.log("\n** API is up and running on port 4k **");
});
