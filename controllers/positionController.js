const Position = require("../models/Position");

const createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    res.status(201).json(position);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Record Updated Successfully", updatedPosition });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePosition = async (req, res) => {
  try {
    await Position.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Record Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPosition,
  getPositions,
  updatePosition,
  deletePosition,
};
