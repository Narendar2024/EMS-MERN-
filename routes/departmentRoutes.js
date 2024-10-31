const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

router.post("/", departmentController.createDepartment);
router.get("/", departmentController.getDepartments);
router.put("/update/:id", departmentController.updateDepartment);
router.delete("/delete/:id", departmentController.deleteDepartment);

module.exports = router;
