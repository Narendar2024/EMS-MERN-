const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
  checkInTime: { type: Date },
  checkOutTime: { type: Date },
  workHours: { type: Number }, // You may calculate and populate this field if needed
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
