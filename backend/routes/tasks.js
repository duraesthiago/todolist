const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/TasksController");

router.get("/", tasksController.index);

module.exports = router;
