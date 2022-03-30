// imports
const express = require("express");
const passport = require("passport");
const router = express.Router();

// routes
const {
  getGroups,
  groupCreate,
  groupDelete,
  joinGroup,
  removeUserFromGroup,
  leaveGroup,
} = require("./controllers");

// path
// - get all groups
router.get("/", getGroups);
// - create a new group
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  groupCreate
);
// - delete a group
router.delete(
  "/delete/:groupId",
  passport.authenticate("jwt", { session: false }),
  groupDelete
);
// - join a group
router.post(
  "/join/:groupId",
  passport.authenticate("jwt", { session: false }),
  joinGroup
);
router.put(
  "/leave/:groupId",
  passport.authenticate("jwt", { session: false }),
  leaveGroup
);
router.delete("remove/:groupId/:userId", removeUserFromGroup);

module.exports = router;
