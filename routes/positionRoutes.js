const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");

router.post("/", positionController.createPosition);
router.get("/", positionController.getPositions);
router.put("/update/:id", positionController.updatePosition);
router.delete("/delete/:id", positionController.deletePosition);

module.exports = router;
