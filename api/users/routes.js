const express = require("express");
const passport = require("passport");
const { signUp, signIn, getUsers } = require("./controllers");
const router = express.Router();

router.post("/signup", signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
router.get("/all", getUsers);

module.exports = router;
