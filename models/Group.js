const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Group", GroupSchema);
