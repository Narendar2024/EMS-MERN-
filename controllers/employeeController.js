const Employee = require("../models/Employee");

const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee Created Succussfully.", newEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate("userId");
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("userId");
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Employee Updated Successfully", updatedEmployee });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Employee Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
