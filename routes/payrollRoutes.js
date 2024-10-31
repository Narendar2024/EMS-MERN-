const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payrollController");

router.post("/", payrollController.createPayroll);
router.get("/all-payrolls", payrollController.getPayroll);
router.get("/employee/:employeeId", payrollController.getPayrollByEmployeeId);
router.put("/update/:id", payrollController.updatePayroll);
router.delete("/delete/:id", payrollController.deletePayroll);

module.exports = router;
