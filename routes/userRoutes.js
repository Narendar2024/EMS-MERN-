const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);
router.get("/all-users", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
