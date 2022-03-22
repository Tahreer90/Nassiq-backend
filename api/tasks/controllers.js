const Group = require("../../models/Group");
const Task = require("../../models/Task");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.getTasksInsideAGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const foundGroup = await Group.findById(groupId).populate("task");
    if (foundGroup) {
      res.status(200).json(foundGroup.task);
    }
  } catch (error) {
    next(error);
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
      res.status(201).json(newtask);
    } else {
      res.status(401).json({ message: "you are not a member of this group" });
    }
  } catch (error) {
    next(error);
  }
};

exports.taskUpdate = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { groupId } = req.params;
    const { taskId } = req.params;
    const foundGroup = await Group.findById(groupId);
    const canAdd = foundGroup.user.find(
      (userId) => JSON.stringify(userId) === JSON.stringify(user)
    );
    req.body.owner = req.user._id;
    if (canAdd) {
      req.body.group = groupId;
      const task = await Task.findByIdAndUpdate(
        taskId,
        req.body,
        { new: true, runValidators: true } // returns the updated task
      );
      res.status(200).json(task);
    } else {
      res.status(401).json({ message: "you are not a member of this group" });
    }
  } catch (err) {
    next(error);
  }
};

exports.taskDelete = async (req, res, next) => {
  try {
    const user = req.user._id;
    const { groupId } = req.params;
    const { taskId } = req.params;
    const foundGroup = await Group.findById(groupId);
    const canAdd = foundGroup.user.find(
      (userId) => JSON.stringify(userId) === JSON.stringify(user)
    );
    if (canAdd) {
      await Task.findByIdAndDelete(taskId);
      res.status(204).end();
    } else {
      res.status(401).json({ message: "you are not a member of this group" });
    }
  } catch (err) {
    next(error);
  }
};
