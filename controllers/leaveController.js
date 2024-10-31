const Leave = require("../models/LeaveModel");

const createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({ message: "Leave", leave });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLeave = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId approvedBy");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateLeave = async (req, res) => {
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Record Updated Successfully", updatedLeave });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Record Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createLeave, getLeave, updateLeave, deleteLeave };
