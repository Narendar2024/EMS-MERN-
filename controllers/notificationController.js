const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res
      .status(201)
      .json({ message: "Notification Created Successfully", notification });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getNotifications = async (req, res) => {
  try {
    const notification = await Notification.find();
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "deleted Notification Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createNotification, getNotifications, deleteNotification };
