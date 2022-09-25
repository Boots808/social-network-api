const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/models/user.js", userRoutes);
router.use("/models/thought.js", thoughtRoutes);

module.exports = router;
