const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/TasksController");

router.get('/:id', tasksController.index);
router.post('/', tasksController.store);
router.put('/:id', tasksController.update);
router.post('/done', tasksController.updateDoneUndone);
router.post('/delete', tasksController.delete);

module.exports = router;
