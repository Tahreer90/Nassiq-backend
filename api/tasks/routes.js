const express = require("express");
const passport = require("passport");
const {
  groupCreate,
  getGroups,
  groupDelete,
  groupUpdate,
} = require("../groups/controllers");
const router = express.Router();

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  groupCreate
);
router.get("/", getGroups);
router.delete("/:groupId", groupDelete);
router.put("/:groupId", groupUpdate);

module.exports = router;
