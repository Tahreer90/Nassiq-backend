const mongoose = require("mongoose");
// const mongooseSlugPlugin = require("mongoose-slug-plugin");
const UserSchema = new mongoose.Schema({
  image: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
  expoToken: String,
});

module.exports = mongoose.model("User", UserSchema);
