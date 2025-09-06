// src/routes/pomodoroRoutes.js
const express = require("express");
const router = express.Router();
const pomodoroController = require("../controllers/pomodoroController");

router.post("/start", pomodoroController.startPomodoro);
router.get("/status", pomodoroController.getStatus);
router.post("/stop", pomodoroController.stopPomodoro);
router.get("/history", pomodoroController.getHistory);

module.exports = router;
