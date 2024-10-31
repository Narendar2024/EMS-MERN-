const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.post("/", attendanceController.createAttendance);
router.get("/all", attendanceController.getAttendance);
router.get(
  "/employee/:employeeId",
  attendanceController.getAttendanceByEmployeeId
);
router.put("/employee/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;
