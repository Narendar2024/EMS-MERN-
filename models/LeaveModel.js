const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "annual", "unpaid"],
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
