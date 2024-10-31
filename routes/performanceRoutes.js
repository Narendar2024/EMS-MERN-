const express = require("express");
const router = express.Router();
const performanceController = require("../controllers/performanceController");

router.post("/", performanceController.createPerformance);
router.get("/", performanceController.getPerformance);
router.put("/update/:id", performanceController.updatePerformance);
router.delete("/delete/:id", performanceController.deletePerformance);

module.exports = router;
