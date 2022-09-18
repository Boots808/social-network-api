const router = require("express").Router();

const {
  getAlluser,
  getUserById,
  inputUser,
  updateUser,
  newFriend,
} = require("../../controllers/user-controller");

//users
router.route("/").get(getAllUser).post(inputUser);

//users :id
router.route("/:id").get(getUserById).put(updateUser);

//users :friendId
router.route("/:userId/friends/:friendId").post(newFriend);

module.exports = router;
