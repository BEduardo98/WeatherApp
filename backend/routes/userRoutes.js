const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/preferences/:userId", userController.updateUserPreferences);
router.delete("/delete/:userId", userController.deleteUser);

module.exports = router;
