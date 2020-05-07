const express = require('express');
const router = express.Router();

const UserDB = require("./userDb");
const PostDB = require("../posts/postDb");

router.post('/', validateUser, (req, res) => { // validateUser,
  UserDB.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({error: "There was an error while saving the user to the database"});
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => { // validatePost
  if (!req.body.user_id) {
    res.status(400).json({error: ""})
  } else {
      PostDB.insert(req.body)
        .then(post => {
          res.status(201).json(post)
          })
        .catch(error => {
          console.log(error);
          res.status(500).json({error: "There was an error while saving the post to the database"});
        });
      }
  })


router.get('/', (req, res) => {
  UserDB.get(req.body)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error retrieving the posts",
        });
    });
});

router.get('/:id', validateUserId, (req, res) => { // validateUserId,
  const user_id = req.params.id;
      UserDB.getById(user_id)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({
              message: "Error retrieving the user",
          });
      });
});

router.get('/:id/posts', validatePost, (req, res) => { // validatePost,
  const user_id = req.params.id;
  UserDB.getUserPosts(user_id)
  .then(posts => {
      res.status(200).json(posts)
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
          message: "Error retrieving the posts",
      });
  });
});

router.delete('/:id', validateUserId, (req, res) => { //validateUserId
  const user_id = req.params.id;
    UserDB.remove(user_id)
    .then(total => {
      res.status(200).json(total)
      total += 1;
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error removing the user",
        });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => { //validateUserId, validateUser
  const user_id = req.params.id;
  UserDB.update(user_id, req.body)
    .then((total) => {
      res.status(200).json(total)
      total += 1;
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({message: "Error updating the post"});
  });
});

//custom middleware

function validateUserId(req, res, next) {
  let userId = req.params;
  if (!userId) {
    res.status(400).json({message: "Invalid user id"})
  } else {
    userId = req.user
  }

  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "Missing user data"})
  } else if (!req.body.name) {
    res.status(400).json({message: "Missing required name field"})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({message: "Missing post data"})
  } else {
    next();
  }
}

module.exports = router;