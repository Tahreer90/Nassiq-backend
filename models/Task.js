const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  Group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
});

module.exports = mongoose.model("Task", UserSchema);
