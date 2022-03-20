const Task = require("../../models/Task");

exports.taskCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    req.body.owner = req.user._id;
    const newtask = await Task.create(req.body);
    return res.status(201).json(newtask);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
