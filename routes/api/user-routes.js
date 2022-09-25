const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  inputUser,
  updateUser,
  newFriend,
} = require("../../controllers/user-controller");

//users
router.route("/").get(getAllUsers).post(inputUser);

//users :id
router.route("/:id").get(getUserById).put(updateUser);

//users :friendId
router.route("/:userId/friends/:friendId").post(newFriend);

module.exports = router;
