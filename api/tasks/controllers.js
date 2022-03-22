const Group = require("../../models/Group");
const Task = require("../../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.taskCreate = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { groupId } = req.params;
    const foundGroup = await Group.findById(groupId);
    const canAdd = foundGroup.user.find(
      (userId) => JSON.stringify(userId) === JSON.stringify(user)
    );
    req.body.owner = req.user._id;
    if (canAdd) {
      req.body.group = groupId;
      const newtask = await Task.create(req.body);
      await Group.findByIdAndUpdate(groupId, {
        $push: { task: newtask._id },
      });
      return res.status(201).json(newtask);
    } else {
      res.status(401).json({ message: "you are not a member of this group" });
    }
  } catch (error) {
    next(error);
  }
};

exports.taskDelete = async (req, res, next) => {
  try {
    await req.task.remove();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};

exports.taskUpdate = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      { _id: req.task.id },
      req.body,
      { new: true, runValidators: true } // returns the updated task
    );
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
