// imports
const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../../middlewares/multer");

// controllers
const { signUp, signIn, getUsers, update } = require("./controllers");

// pathes
// - get all users
router.get("/all", getUsers);
// - signup a user
router.post("/signup", signUp);
// - signin a user
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
// - update a user profile
router.put(
  "/update",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  update
);

module.exports = router;
