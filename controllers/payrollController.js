const Payroll = require("../models/Payroll");

const createPayroll = async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();
    res
      .status(201)
      .json({ message: "Payroll record created successfully", payroll });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPayroll = async (req, res) => {
  try {
    const payrollRecords = await Payroll.find().populate("employeeId");
    res.status(200).json(payrollRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPayrollByEmployeeId = async (req, res) => {
  try {
    const payrollRecords = await Payroll.find({
      employeeId: req.params.employeeId,
    });
    res.status(200).json(payrollRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePayroll = async (req, res) => {
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPayroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePayroll = async (req, res) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPayroll,
  getPayroll,
  getPayrollByEmployeeId,
  updatePayroll,
  deletePayroll,
};
