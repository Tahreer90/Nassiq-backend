const Group = require("../../models/Group");
const User = require("../../models/User");

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("user owner");
    return res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.groupCreate = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    req.body.owner = req.user._id;
    const newGroup = await Group.create(req.body);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { group: newGroup._id },
    });
    return res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
};

exports.groupDelete = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const foundGroup = await Group.findById(groupId).populate("owner user");
    const foundUsers = foundGroup.user;
    if (String(req.user._id) === String(foundGroup.owner._id)) {
      foundUsers.forEach((user) => {
        user.group = user.group.filter(
          (group) => JSON.stringify(group) !== JSON.stringify(groupId)
        );
      });

      await Group.remove(foundGroup);
      res.status(204).end();
    } else {
      res.status(401).json({ message: "you are not authorized" });
    }
  } catch (err) {
    next(error);
  }
};
