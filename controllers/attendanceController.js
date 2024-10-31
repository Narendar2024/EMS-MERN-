const Attendance = require("../models/Attendance");

const createAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json({
      message: "Attendance record created successfully",
      newAttendance,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("employeeId");
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAttendanceByEmployeeId = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find({
      employeeId: req.params.employeeId,
    }).populate("employeeId");
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const updatedAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Attendance record updated successfully",
      updatedAttendance,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  getAttendanceByEmployeeId,
  updateAttendance,
  deleteAttendance,
};
