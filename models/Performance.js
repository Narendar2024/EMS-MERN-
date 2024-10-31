const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  reviewDate: { type: Date, required: true },
  rating: { type: Number, min: 1, max: 5 },
  feedback: { type: String },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Performance = mongoose.model("Performance", performanceSchema);
module.exports = Performance;
