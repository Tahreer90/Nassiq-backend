const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");
const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: String,
  isChecked: Boolean,
  edit: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
