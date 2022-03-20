const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  User: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  Task: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

module.exports = mongoose.model("Group", UserSchema);
