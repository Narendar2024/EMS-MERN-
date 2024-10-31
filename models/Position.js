const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});
const Position = mongoose.model("Position", positionSchema);
module.exports = Position;
