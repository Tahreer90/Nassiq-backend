const User = require("../../models/User");
const Group = require("../../models/Group");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { password, username } = req.body;

    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(req.body);

    const defaultGroupData = { name: "Personal", User: newUser._id };
    const defaultGroup = await Group.create(defaultGroupData);

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + process.env.EXPTIME,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const newUser = req.user;
    const payload = {
      _id: newUser._id,
      username: newUser.username,
      exp: Date.now() + +process.env.EXPTIME,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
