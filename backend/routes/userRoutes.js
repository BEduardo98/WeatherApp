const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/user/register", userController.registerUser);

router.post("/user/login", userController.loginUser);

router.get("/user/preferences/:userId", userController.getUserPreferences);

router.get("/user/:userId", userController.getUserInfo);

router.get("/user/notifications/:id", userController.getUserNotifications);

router.get("/user/search-history/:userId", userController.getUserSearchHistory);

router.put("/user/preferences/:userId", userController.updateUserPreferences);

router.put("/user/notifications/:userId", userController.toggleNotifications);

module.exports = router;
