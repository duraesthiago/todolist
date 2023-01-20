const { Tasks, User } = require('../database/models');

const controller = {
    index: async (req, res) => {
        let userId = req.params.id;
        const tasks = await Tasks.findAll({
            raw: true, where: {
                users_idusers: userId
            }
        });
        if (tasks === null) {
            console.log('Not found!');
        }
        res.send(tasks);
    },
    store: async (req, res) => {
        let { task_text, users_idusers } = req.body;

        const task = await Tasks.create({
            task_text,
            users_idusers,
        });
        return res.status(201).json();

    },
    delete: async (req, res) => {
        idTask = req.body.idtasks;
        const taskDeleted = await Tasks.findByPk(idTask);

        await taskDeleted.destroy();

        return res.status(200).json();
    },

    update: async (req, res) => {

    },
    updateDoneUndone: async (req, res) => {
        let taskToggle = req.body;
        const taskToToggle = await Tasks.update({
            task_done: taskToggle.task_done,
        }, {
            where: {
                idtasks: taskToggle.idtasks,
            }
        })
        return res.status(201).json();
    }
}

module.exports = controller;