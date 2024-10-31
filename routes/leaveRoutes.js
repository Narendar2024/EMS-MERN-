const express = require("express");
const router = express.Router();
const leaveController = require("../controllers/leaveController");

router.post("/", leaveController.createLeave);
router.get("/", leaveController.getLeave);
router.put("/update/:id", leaveController.updateLeave);
router.delete("/delete/:id", leaveController.deleteLeave);

module.exports = router;
