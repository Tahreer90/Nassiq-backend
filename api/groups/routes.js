const express = require("express");
const passport = require("passport");
const { getGroups, groupCreate, groupDelete } = require("./controllers");
const router = express.Router();

router.get("/", getGroups);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  groupCreate
);
router.delete(
  "/delete/:groupId",
  passport.authenticate("jwt", { session: false }),
  groupDelete
);

module.exports = router;
