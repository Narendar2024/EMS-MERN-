const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  salary: { type: Number, required: true },
  dateOfJoining: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
