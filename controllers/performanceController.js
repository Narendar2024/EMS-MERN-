const Performance = require("../models/Performance");

const createPerformance = async (req, res) => {
  try {
    const performance = new Performance(req.body);
    await performance.save();
    res
      .status(201)
      .json({ message: "Record Created Successfully", performance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPerformance = async (req, res) => {
  try {
    const performanceRecords = await Performance.find().populate("employeeId");
    res.status(200).json(performanceRecords);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePerformance = async (req, res) => {
  try {
    const updatedPerformance = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPerformance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePerformance = async (req, res) => {
  try {
    await Performance.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPerformance,
  getPerformance,
  updatePerformance,
  deletePerformance,
};
