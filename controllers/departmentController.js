const Department = require("../models/Department");

const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDepartments = async (req, res) => {
  try {
    const department = await Department.find().populate("managerId");
    res.status(200).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Record Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
