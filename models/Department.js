const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
