const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  // createThought,
  updateThought,
  inputReaction,
} = require("../../controllers/thought-controller");

//thoughts
router.route("/").get(getAllThoughts).post(createThought);

//thoughts :id
router.route("/:id").get(getThoughtById).put(updateThought);

//thought :id reactions
router.route("/:thoughtId/reactions").post(inputReaction);

router.route("/:thoughtId/reactions/:reactionId");

module.exports = router;
