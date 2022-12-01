const { Tasks, User } = require('../database/models');

const controller = {
    index: async (req, res) => {
        let userId = req.params.id;
        const tasks = await User.findByPk(userId, { include: 'tasks' });
        if (tasks === null) {
            console.log('Not found!');
        }
        res.send(tasks);
    },
    store: async (req, res) => {
        let { taskText } = req.body;

        const task = await Task.create({});
        return res.status(201).json();

    },
    delete: async (req, res) => {

    },
    update: async (req, res) => {

    },
    updateDone: async (req, res) => {

    },
    updateUndone: async (req, res) => {

    }
}

module.exports = controller;