const User = require("../../models/User");
const Group = require("../../models/Group");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(password, saltRounds);
    req.body.image = "media/emptyUser.png";
    const newUser = await User.create(req.body);

    const defaultGroupData = {
      name: "Personal",
      user: newUser._id,
      owner: newUser._id,
    };
    const defaultGroup = await Group.create(defaultGroupData);

    const payload = {
      _id: newUser._id,
      username: newUser.username,
      image: newUser.image,
      group: newUser.group,
      exp: Date.now() + +process.env.EXPTIMER,
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
      image: newUser.image,
      group: newUser.group,

      exp: Date.now() + +process.env.EXPTIMER,
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

exports.update = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }

    if (req.body.newpassword) {
      const password = req.body.newpassword;
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(password, saltRounds);
    }

    if (req.body.newusername) {
      req.body.username = req.body.newusername;
    }

    const updateUser = await User.findByIdAndUpdate(req.user._id, req.body);

    const payload = {
      _id: updateUser._id,
      username: updateUser.username,
      exp: Date.now() + +process.env.EXPTIMER,
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
