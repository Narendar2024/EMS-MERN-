const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  basicSalary: { type: Number, required: true },
  totalDaysWorked: { type: Number, required: true },
  overtime: { type: Number, default: 0 },
  grossPay: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  netPay: { type: Number, required: true },
});

const Payroll = mongoose.model("Payroll", payrollSchema);
module.exports = Payroll;
