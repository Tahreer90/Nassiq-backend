const express = require("express");
const passport = require("passport");
const {
  taskCreate,
  getTasks,
  taskDelete,
  taskUpdate,
} = require("./controllers");
const router = express.Router();

router.get("/", getTasks);
router.post(
  "/new/:groupId",
  passport.authenticate("jwt", { session: false }),
  taskCreate
);
router.delete("/delete/:taskId", taskDelete);
router.put("/:taskId", taskUpdate);
module.exports = router;
