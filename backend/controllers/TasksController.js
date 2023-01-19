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
        console.log(req.user);

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