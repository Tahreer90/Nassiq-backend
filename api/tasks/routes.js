// imports
const express = require("express");
const passport = require("passport");
const router = express.Router();

// controllers
const {
  taskCreate,
  getTasks,
  taskDelete,
  taskUpdate,
  getTasksInsideAGroup,
} = require("./controllers");

// pathes
// - get all tasks
router.get("/", getTasks);
// - get all tasks inside a group
router.get("/:groupId", getTasksInsideAGroup);
// - add a new task to a group
router.post(
  "/new/:groupId",
  passport.authenticate("jwt", { session: false }),
  taskCreate
);
// - update a task
router.put(
  "/update/:groupId/:taskId",
  passport.authenticate("jwt", { session: false }),
  taskUpdate
);
// - delete a task
router.delete(
  "/delete/:groupId/:taskId",
  passport.authenticate("jwt", { session: false }),
  taskDelete
);

module.exports = router;
