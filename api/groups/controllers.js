const Group = require("../../models/Group");

exports.groupCreate = async (req, res, next) => {
  try {
    console.log(req.user);
    req.body.owner = req.user._id;
    const newGroup = await Group.create(req.body);
    return res.status(201).json(newGroup);
  } catch (error) {
    next(error);
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    return res.json(groups);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.groupDelete = async (req, res, next) => {
  try {
    await req.group.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.groupUpdate = async (req, res, next) => {
  try {
    const group = await Group.findByIdAndUpdate(
      { _id: req.group.id },
      req.body,
      { new: true, runValidators: true } // returns the updated group
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
