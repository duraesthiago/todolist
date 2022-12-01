const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/TasksController");

router.get('/', tasksController.index);
router.post('/', tasksController.store);
router.delete('/:id', tasksController.delete);
router.put('/:id', tasksController.update);
router.patch('/:id/done', tasksController.updateDone);
router.patch('/:id/undone', tasksController.updateUndone);

module.exports = router;
