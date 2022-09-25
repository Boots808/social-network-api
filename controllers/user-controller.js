const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Post a new user
  createUser(req, res) {
    if (req.body.username && req.body.email) {
      User.create(req.body)
        .then((user) => res.status(200).json(user))
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(404).json("Request body must contain username and password");
    }
  },

  // Get a single user by its id and populated thought and friend data
  getSingleUser(req, res) {
    User.findById(req.params.userId)
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "No user found with this id" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by its id
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.userId)
      .then((user) =>
        // Remove user's associated thoughts
        user
          ? Thought.deleteMany({ _id: { $in: user.thoughts } })
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .then(() =>
        res
          .status(200)
          .json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a new friend to user's friend list
  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from user's friend list
  deleteFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ message: "No user found with this id!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
